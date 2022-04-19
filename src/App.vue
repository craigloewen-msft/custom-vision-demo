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
        <div class="imageBox">
          <figure class="figure">
            <img :src="img" class="img-responsive" />
          </figure>
          <div class="overlayBox">
            <div
              v-for="(predictionItem, predictionIndex) in predictionList"
              :key="predictionIndex"
              class="identifiedBox"
              :style="{
                width: predictionItem.boundingBox.width * 100 + '%',
                height: predictionItem.boundingBox.height * 100 + '%',
                top: predictionItem.boundingBox.top * 100 + '%',
                left: predictionItem.boundingBox.left * 100 + '%',
              }"
            >
              <div class="identifiedBoxTag">
                {{ predictionItem.name }}, {{ predictionItem.probability }}
              </div>
            </div>
          </div>
        </div>
        <div v-if="predictionList.length > 0">
          <div
            v-for="(predictionItem, predictionIndex) in predictionList"
            :key="predictionIndex"
          >
            {{ predictionItem.name }}, {{ predictionItem.probability }}%
          </div>
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
            predictionRenderObject.boundingBox = visitor.boundingBox; // height, left, top, width

            predictionRenderList.push(predictionRenderObject);
          }

          this.predictionList = predictionRenderList;
        });
    },
  },
};
</script>

<style>
.identifiedBox {
  height: 100px;
  border: 1px solid red;
  position: absolute;
  top: 10%;
  color: red;
}

.identifiedBoxTag {
  background: black;
  display: inline;
}

.overlayBox {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
  width: 100%;
}

.imageBox {
  position: relative;
}

.imageBox figure {
  margin: 0 0;
}

.imageBox figure img {
  max-width: 100%;
}
</style>