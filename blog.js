let blogs = [];

function addBlog(event) {
    event.preventDefault()

    let title = document.getElementById('input-blog-title').value;
    let content = document.getElementById('input-blog-content').value;
    let image = document.getElementById('input-blog-image').files;
    image = URL.createObjectURL(image[0])


    let blog = {
        title: title,
        content: content,
        image: image
    }

    blogs.push(blog)

    renderBlog()
}


function renderblog(){
    let contentContainer = document.getElementById('contents')

    contentContainer.innerHTML = ''

    for(let i = 0; i <= blogs.length; i++){
        contentContainer.innerHTML += `
        <div class="blog-list-item">
          <div class="blog-image">
            <img src="${blogs[i].image}" />
          </div>
          <div class="blog-content">
            <div class="btn-group">
              <button class="btn-edit">Edit Post</button>
              <button class="btn-post" onclick="deletePost(${blogs[i].postAt})">Delete Blog</button>
            </div>
            <h1>
              <a href="blog-detail.html" target="_blank"
                >${blogs[i].title}</a
              >
            </h1>
            <div class="detail-blog-content">
              ${getFulltime(blogs[i].postAt)} | ${blogs[i].author}
            </div>
            <p>
                ${blogs[i].content}
            </p>
            <div style="text-align: right;">
              <span style="color: gray; font-size: 12px;">${distanceTime(blogs[i].postAt)}</span>
            </div>
          </div>
        </div>
        `
    }
}


// let waktu = new Date()

// console.log(waktu);

// console.log(waktu.getDate());
// console.log(waktu.getMonth());
// console.log(waktu.getFullYear());

// console.log(waktu.getHours());
// console.log(waktu.getMinutes());


let month = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Des']

function getFulltime(time){

  let date = time.getDate()
  let monthIndex = time.getMonth()
  let year = time.getFullYear()

  let hours = time.getHours()
  let minutes = time.getMinutes()

  let fullTime = `${date} ${month[monthIndex]} ${year} ${hours}:${minutes} WIB`

  return fullTime
}

function distanceTime(time){
  let timeNow = new Date()
  let timePost = time
  let distance = timeNow - timePost

  let milisecond = 1000
  let seconInHours = 3600
  let hoursInDay = 24

  let distanceDay = distance / (milisecond * seconInHours * hoursInDay)
  distanceDay = Math.floor(distanceDay)

  if(distanceDay >= 1){
    return `${distanceDay}  day ago`
  } else{
    let distanceHours = Math.floor(distance / (1000 * 60 * 60))

    if ( distanceHours >= 1 ){
      return `${distanceHours}  hours ago`

    }else{
      let distanceMinute = Math.floor(distance / (1000 * 60))

      if(distanceMinute) {
      return `${distanceMinute} minutes ago`
      }else{
        let distanceSecond = Math.floor(distance / 1000)

        return `${distanceSecond} seconds ago`
      }
    }
  }
}

function deletePost(id){
  for(let i = 0; i< blogs.length ; i++){
    if(id === blogs[i].postAt){
      blogs.splice(i,1)
    }
  }
}

setInterval(() => {
  renderblog()
}, 1000)







