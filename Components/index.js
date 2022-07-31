var feedDiv = document.getElementById("newsFeed")
var loader = document.getElementById("loader")
function newsFeed(node) {
    console.log("IN Feed");
    let li = document.createElement("div")
    li.classList.add("col-", "m-1")
    let ul = document.createElement("div")
    ul.classList.add("col")
    let img = document.createElement("img")
    img.classList.add("card-img-top", "col")
    img.src = node.field_photo_image_section
    ul.appendChild(img)
    let body = document.createElement("div")
    body.classList.add("card-body", "col")
    let title = document.createElement("p")
    title.classList.add("card-text")
    title.innerHTML = node.title
    let time = document.createElement("p")
    time.classList.add("card-footer", "text-muted")
    time.innerHTML = node.last_update
    body.appendChild(title)
    body.appendChild(time)
    li.appendChild(ul)
    li.appendChild(body)
    feedDiv.appendChild(li)
}
const hideLoader = () => {
    loader.classList.remove('show');
};

const showLoader = () => {
    loader.classList.add('show');
};
console.log(feedDiv);
(async function getBaseFeed() {
    console.log("Calling")
    var feed = []
    fetch('http://localhost:3000/').then(function (response) {

        // The API call was successful!
        if (response.ok) {
            return response.json();
        }

        // There was an error
        return Promise.reject(response);

    }).then(function (data) {
        // This is the JSON from our response
        feed = data
        // console.log(feed);
        feed.map(({ node }) => {
            // console.log(node,"val")

            if (node) {
                // console.log("heelo in");
                newsFeed(node)

            }
        })
    }).catch(function (err) {
        // There was an error
        console.warn('Something went wrong.', err);
    });

})()

window.addEventListener('scroll', () => {
    console.log(window.scrollY) //scrolled from top
    console.log(window.innerHeight) //visible part of screen
    console.log(feedDiv.scrollHeight);
    if (window.scrollY + window.innerHeight >=
        feedDiv.scrollHeight) {
        loadImages();
    }

})
function loadImages() {
    console.log("scroll")

    showLoader()

    fetch('http://localhost:3000/newFeed').then(function (response) {
        // The API call was successful!
        if (response.ok) {
            return response.json();
        }
        // There was an error
        return Promise.reject(response);

    }).then(function (data) {
        // This is the JSON from our response
        feed = data
        // console.log(feed);
        feed.map(({ node }) => {
            if (node) {
                hideLoader()
                newsFeed(node)
            }
            else {
                console.log("no data");
            }
        })

    }).catch(function (err) {
        // There was an error
        console.warn('Something went wrong.', err);
    });

}