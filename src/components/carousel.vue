<template>
  <div class="wrap">
    <div class="container-slider-video">
      <div
        id="video-slider"
        class="carousel slide"
        data-ride="carousel"
        data-interval="10000"
      >
        <div class="carousel-inner">
          <div class="carousel-item active">
            <video id="videoSL" loop muted autoplay>
              <source src="../../public/media/video6.mp4" type="video/mp4" />
            </video>
            <div class="container-fluid content-video">
              <div class="row">
                <div class="offset-md-2 col-md-6 content">
                  <h2>Love Where You Live</h2>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Voluptas, natus! Magnam non at vero cumque debitis quidem
                    inventore impedit velit! Incidunt dicta repellat saepe odio
                    voluptatem iusto. Non, quisquam quia!
                  </p>
                  <router-link
                    v-if="role == ''"
                    to="/register"
                    class="btn btn-info"
                    >Begin</router-link
                  >
                </div>
              </div>
            </div>
          </div>
          <div class="carousel-item">
            <video id="videoSL" loop muted autoplay>
              <source src="../../public/media/video2.mp4" type="video/mp4" />
            </video>
            <div class="container-fluid content-video">
              <div class="row">
                <div class="offset-md-2 col-md-6 content">
                  <h2>A Home Changes Everything</h2>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Voluptas, natus! Magnam non at vero cumque debitis quidem
                    inventore impedit velit! Incidunt dicta repellat saepe odio
                    voluptatem iusto. Non, quisquam quia!
                  </p>
                  <router-link
                    v-if="role == ''"
                    to="/register"
                    class="btn btn-info"
                    >Begin</router-link
                  >                </div>
              </div>
            </div>
          </div>
          <div class="carousel-item">
            <video id="videoSL" loop muted autoplay>
              <source src="../../public/media/video3.mp4" type="video/mp4" />
            </video>
            <div class="container-fluid content-video">
              <div class="row">
                <div class="offset-md-2 col-md-6 content">
                  <h2>Move to What Moves You</h2>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Voluptas, natus! Magnam non at vero cumque debitis quidem
                    inventore impedit velit! Incidunt dicta repellat saepe odio
                    voluptatem iusto. Non, quisquam quia!
                  </p>
                  <router-link
                    v-if="role == ''"
                    to="/register"
                    class="btn btn-info"
                    >Begin</router-link
                  >                  <ol class="carrousel indicator">
                    <li
                      data-target="#video-slider"
                      data-slide-to="0"
                      class="active"
                    ></li>
                    <li data-target="#video-slider" data-slide-to="1"></li>
                    <li data-target="#video-slider" data-slide-to="2"></li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
        <a
          class="carousel-control-prev"
          href="#video-slider"
          role="button"
          data-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </a>
        <a
          href="#video-slider"
          role="button"
          data-slide="next"
          class="carousel-control-next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      role: "",
    };
  },
  mounted() {
    this.role = this.$store.getters.getRole;
  },
};
</script>


<style scoped>
* {
  margin: 0;
  padding: 0;
}
section {
  width: 100%;
}
.wrap {
  width: 100%;
  height: auto;
  max-height: 80%;
}
.container-slider-video {
  width: 100%;
  height: auto;
  max-height: 80%;
}
.carousel-control-next-icon,
.carousel-control-prev-icon {
  width: 48px;
  height: 48px;
}
.carousel-item {
  position: relative;
  height: auto;
}
#videoSL {
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  object-fit: cover;
  z-index: -1;
  width: 100%;
}
.content-video {
  position: absolute;
  left: 75%; 
  top: 85%; 
  transform: translate(-50%, -50%); /* precise centering */
}
h3 { /* Not used => title top of video */
  color: white;
  position: absolute;
  left: 50%; 
  top: 150px;
  font-size: 3vw;
  transform: translate(-50%, -50%); /* precise centering */
  z-index: 1;
}
h2 {
  color: #ffffff;
  font-size: 2.5vw;
  text-transform: uppercase;
}
p {
  color: white;
}
a {
  text-transform: uppercase;
  letter-spacing: 2px;
  font-size: 1em;
}
.btn {
  margin-bottom: 15px;
}
</style>
