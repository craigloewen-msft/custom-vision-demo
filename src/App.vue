<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6">
        <h2>Current Camera</h2>
        <code v-if="device">{{ device.label }}</code>
        <div class="border">
          <vue-web-cam
            ref="webcam"
            :device-id="deviceId"
            width="100%"
            @started="onStarted"
            @stopped="onStopped"
            @error="onError"
            @cameras="onCameras"
            @camera-change="onCameraChange"
          />
        </div>

        <div class="row">
          <div class="col-md-12">
            <select v-model="camera">
              <option>-- Select Device --</option>
              <option
                v-for="device in devices"
                :key="device.deviceId"
                :value="device.deviceId"
              >
                {{ device.label }}
              </option>
            </select>
          </div>
          <div class="col-md-12">
            <button type="button" class="btn btn-primary" @click="onCapture">
              Capture Photo
            </button>
            <button type="button" class="btn btn-danger" @click="onStop">
              Stop Camera
            </button>
            <button type="button" class="btn btn-success" @click="onStart">
              Start Camera
            </button>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <h2>Captured Image</h2>
        <figure class="figure">
          <img :src="img" class="img-responsive" />
        </figure>
        <div v-if="predictionList.length > 0">
          <h3>Predictions</h3>
          <ul>
            <li
              v-for="(predictionItem, predictionIndex) in predictionList"
              :key="predictionIndex"
            >
              {{ predictionItem.name }}, {{ predictionItem.probability }}%
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { WebCam } from "vue-web-cam";
// import { PredictionAPIClient } from "@azure/cognitiveservices-customvision-prediction";
// import { ApiKeyCredentials } from "@azure/ms-rest-js";

export default {
  name: "App",
  components: {
    "vue-web-cam": WebCam,
  },
  data() {
    return {
      img: null,
      camera: null,
      deviceId: null,
      devices: [],
      predictionList: [],
    };
  },
  computed: {
    device: function () {
      return this.devices.find((n) => n.deviceId === this.deviceId);
    },
  },
  watch: {
    camera: function (id) {
      this.deviceId = id;
    },
    devices: function () {
      // Once we have a list select the first one
      const [first, ...tail] = this.devices;
      console.log("Tail: ", tail);
      if (first) {
        this.camera = first.deviceId;
        this.deviceId = first.deviceId;
      }
    },
  },
  methods: {
    onCapture() {
      this.img = this.$refs.webcam.capture();

      this.useVisionAPI();
    },
    onStarted(stream) {
      console.log("On Started Event", stream);
    },
    onStopped(stream) {
      console.log("On Stopped Event", stream);
    },
    onStop() {
      this.$refs.webcam.stop();
    },
    onStart() {
      this.$refs.webcam.start();
    },
    onError(error) {
      console.log("On Error Event", error);
    },
    onCameras(cameras) {
      this.devices = cameras;
      console.log("On Cameras Event", cameras);
    },
    onCameraChange(deviceId) {
      this.deviceId = deviceId;
      this.camera = deviceId;
      console.log("On Camera Change Event", deviceId);
    },
    // Function from stack overflow
    // https://stackoverflow.com/questions/36585018/saving-data-uri-as-image?msclkid=4c9de9d8c00311ec94b3f16256302c0a
    dataURItoBlob(dataURI) {
      var byteStr;
      if (dataURI.split(",")[0].indexOf("base64") >= 0)
        byteStr = atob(dataURI.split(",")[1]);
      else byteStr = unescape(dataURI.split(",")[1]);

      var mimeStr = dataURI.split(",")[0].split(":")[1].split(";")[0];

      var arr = new Uint8Array(byteStr.length);
      for (var i = 0; i < byteStr.length; i++) {
        arr[i] = byteStr.charCodeAt(i);
      }

      return new Blob([arr], { type: mimeStr });
    },
    useVisionAPI: async function () {
      this.predictionList = [];

      const customVisionPredictionKey =
        process.env.VUE_APP_CUSTOMVISIONPREDICTKEY ||
        "<customVisionPredictionKey>";
      const customVisionPredictionEndPoint =
        process.env.VUE_APP_CUSTOMVISIONPREDICTENDPOINT ||
        "<customVisionPredictionEndPoint>";

      console.log("Changing to binary");
      let webcamCapture = this.$refs.webcam.capture();
      let dataBinary = this.dataURItoBlob(webcamCapture);
      console.log(dataBinary);

      this.axios
        .post(customVisionPredictionEndPoint, dataBinary, {
          headers: {
            "Prediction-Key": customVisionPredictionKey,
            "Content-Type": "application/octet-stream",
          },
        })
        .then((response) => {
          console.log(response.data);
          const predictions = response.data.predictions;

          console.log("Predictions");
          console.log(predictions);

          let predictionRenderList = [];

          for (let i = 0; i < predictions.length; i++) {
            let predictionRenderObject = {};
            let visitor = predictions[i];
            predictionRenderObject.name = visitor.tagName;
            predictionRenderObject.probability = (
              visitor.probability * 100.0
            ).toFixed(2);
            predictionRenderList.push(predictionRenderObject);
          }

          this.predictionList = predictionRenderList;
        });
    },
  },
};
</script>