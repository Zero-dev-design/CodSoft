/* =========================
   PROJECT DATA
========================= */

const projects = [

    {
        title: "Creature Design",
        media: [
            // {
            //     type: "video",
            //     src: "static/videos/P1/demo.mp4",
            //     thumbnail: "static/images/P1/video-thumb.jpg"
            // },            { type: "image", src: "static/images/P1/project1.jpg" },

            // {
            //     type: "video",
            //     src: "static/videos/P1/demo copy.mp4",
            //     thumbnail: "static/images/P1/video-thumb.jpg"
            // },

            { type: "image", src: "static/images/P1/FrontView.png" },
            { type: "image", src: "static/images/P1/SideView.png" }

        ],

description: "A creature design and visualization project that combines artistic creativity with technical precision through high-detail sculpting, realistic rendering, and production-ready asset workflows.",
        tags: ["Blender", "3D Modeling", "Rendering", "Creature Design"]
    },

    {
        title: "Calculator",
        media: [
            { type: "image", src: "static/images/P2/project2.png" },
            { type: "image", src: "static/images/P2/pic1.png" },
            { type: "image", src: "static/images/P2/pic2.png" }
        ],
description: "A responsive calculator application built with HTML, CSS, and JavaScript, featuring a CSS Grid-based layout, intuitive user interface, and real-time arithmetic operations.",        tags: ["HTML", "CSS", "JavaScript"]
    },

    {
    title: "Creature Design Collection",
    media: [
        { type: "image", src: "static/images/P3/project3.png" },
        { type: "image", src: "static/images/P3/q.png" },
        { type: "image", src: "static/images/P3/q1.png" },
        { type: "image", src: "static/images/P3/2.png" }
    ],
    description: "A collection of original creature concepts created for an upcoming game project. The designs focus on anatomy, silhouette, visual storytelling, and game-ready production workflows, with each creature developed to enhance world-building and immersive gameplay experiences.",
    tags: ["Blender", "Creature Design", "3D Sculpting", "Game Assets"]
},

    {
        title: "Publishing Platform",
        media: [
            { type: "image", src: "static/images/P4/Project.png" },
            { type: "image", src: "static/images/P4/pic1.png" },
            { type: "image", src: "static/images/P4/pic2.png" },
            { type: "image", src: "static/images/P4/pic3.png" },
            { type: "image", src: "static/images/P4/pic4.png" },
            { type: "image", src: "static/images/P4/pic5.png" },
            { type: "image", src: "static/images/P4/pic7.png" },
            { type: "image", src: "static/images/P4/pic8.png" },
            { type: "image", src: "static/images/P4/pic9.png" },
            { type: "image", src: "static/images/P4/pic10.png" },
            { type: "image", src: "static/images/P4/pic11.png" },
            { type: "image", src: "static/images/P4/pic12.png" },
            { type: "image", src: "static/images/P4/pic13.png" }

        ],
description: "A full-stack game publishing platform developed with ASP.NET Core and C#, featuring secure user authentication, password hashing, SQL Server database integration, and administrative tools for managing games, users, and platform content.",        tags: ["ASP.NET", "C#", "SQL", "Authentication"]
    }

];

/* =========================
   INFINITE CAROUSEL
========================= */

const track = document.querySelector(".projects-track");
const slider = document.querySelector(".projects-slider");

track.innerHTML += track.innerHTML;

let position = 0;
let speed = 0.7;

function animateCarousel() {

    position -= speed;

    if (Math.abs(position) >= track.scrollWidth / 2) {
        position = 0;
    }

    track.style.transform = `translateX(${position}px)`;

    requestAnimationFrame(animateCarousel);
}

animateCarousel();

slider.addEventListener("mouseenter", () => speed = 0);
slider.addEventListener("mouseleave", () => speed = 0.7);

/* =========================
   PROJECT VIEWER
========================= */

const viewer = document.getElementById("projectViewer");
const closeViewer = document.getElementById("closeViewer");
const mainPreview = document.getElementById("mainPreview");

const viewerTitle = document.getElementById("viewerTitle");
const viewerDescription = document.getElementById("viewerDescription");
const viewerTags = document.getElementById("viewerTags");

const cards = document.querySelectorAll(".project-card");

let autoSlide;
let currentMediaIndex = 0;

/* =========================
   OPEN PROJECT
========================= */

cards.forEach((card, index) => {

    card.addEventListener("click", () => {

        const project = projects[index % projects.length];

        const thumbnailStrip = document.getElementById("thumbnailStrip");
        thumbnailStrip.innerHTML = "";

        currentMediaIndex = 0;

        clearInterval(autoSlide);

        /* =========================
           CHANGE MEDIA FUNCTION
        ========================= */

        function changeMedia(i) {

            currentMediaIndex = i;

            const media = project.media[currentMediaIndex];

            mainPreview.innerHTML = "";

            let videoElement = null;

            if (media.type === "image") {

                const img = document.createElement("img");
                img.src = media.src;
                mainPreview.appendChild(img);

            } else if (media.type === "video") {

                const video = document.createElement("video");

                video.src = media.src;
                video.autoplay = true;
                video.muted = true;
                video.controls = true;

                mainPreview.appendChild(video);

                videoElement = video;
            }

            /* THUMBNAIL UPDATE */
            const thumbs = document.querySelectorAll(".thumbnail");

            thumbs.forEach(t => t.classList.remove("active"));

            if (thumbs[currentMediaIndex]) {

                thumbs[currentMediaIndex].classList.add("active");

                thumbs[currentMediaIndex].scrollIntoView({
                    behavior: "smooth",
                    inline: "center"
                });
            }

            /* =========================
            VIDEO HANDLING FIX
            ========================= */

            clearInterval(autoSlide);

            if (videoElement) {

                // WAIT UNTIL VIDEO ENDS BEFORE SLIDING
                videoElement.onended = () => {

                    nextSlide(project);
                };

            } else {

                // IMAGE → NORMAL TIMER
                autoSlide = setTimeout(() => {

                    nextSlide(project);

                }, 4000);
            }
        }
        function nextSlide(project) {

            let next = currentMediaIndex + 1;

            if (next >= project.media.length) {
                next = 0;
            }

            changeMedia(next);
        }
        /* =========================
           BUILD THUMBNAILS
        ========================= */

        project.media.forEach((media, i) => {

            const thumb = document.createElement("div");
            thumb.classList.add("thumbnail");

            if (media.type === "image") {

                thumb.innerHTML = `<img src="${media.src}">`;

            } else {

                thumb.innerHTML = `
                    <div class="video-thumb">
                        <img src="${media.thumbnail}">
                        <div class="play-icon">▶</div>
                    </div>
                `;
            }

            thumb.addEventListener("click", () => {

                changeMedia(i);
            });

            thumbnailStrip.appendChild(thumb);

        });

        /* INIT */
        changeMedia(0);

        /* TEXT */
        viewerTitle.textContent = project.title;
        viewerDescription.textContent = project.description;

        viewerTags.innerHTML = "";

        project.tags.forEach(tag => {

            const span = document.createElement("span");
            span.textContent = tag;
            viewerTags.appendChild(span);

        });

        viewer.classList.add("active");

    });

});

/* =========================
   CLOSE VIEWER
========================= */

closeViewer.addEventListener("click", () => {

    viewer.classList.remove("active");
    clearInterval(autoSlide);

});