let width = 680;
let height = 480;
let divRoot = $("#affdex_elements")[0];
let faceMode = affdex.FaceDetectorMode.LARGE_FACES;
let detector = new affdex.CameraDetector(divRoot, width, height, faceMode);

detector.detectAllEmotions();
detector.detectAllAppearance();
detector.detectAllExpressions();

let imageShownIndex = 0;
let joy = [0, 0];

document.querySelector("#nextPicture").onclick = function() {
    if (imageShownIndex === 6) {
        if (joy[0] > joy[1]) {
            document.querySelector("#image").src = "pictures/catresult.jpg";//-niko
        } else if (joy[1] > joy[0]) {
            document.querySelector("#image").src = "pictures/dogresult.jpg";//-niko
        } else {
            document.querySelector("#results").innerText = "Oh hi Mark Zuckerberg (test inconclusive)";
        }
    } else {
        if (detector && !detector.isRunning)
            detector.start();
        document.querySelector("#image").src = "pictures/" + (++imageShownIndex) + ".jpg";
        document.querySelector("#nextPicture").disabled = true;
    }
};


document.querySelector("#reset").onclick = function () {
    if (detector) detector.reset();
    document.querySelector("#image").src = "pictures/startingpicture.jpg";
    document.querySelector("#results").innerText="";
};

detector.addEventListener("onImageResultsSuccess", function(faces) {
    console.log("Number of faces found: " + faces.length);
    if (faces.length > 0) {
        joy[imageShownIndex % 2] += faces[0].emotions.joy;
        document.querySelector("#nextPicture").disabled = false;
    }
});
