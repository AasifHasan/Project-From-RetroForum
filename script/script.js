const loadData = async () => {
    const res = await fetch(
      "https://openapi.programming-hero.com/api/retro-forum/posts"
    );
    const data = await res.json();
    displayPost(data.posts);
  };
  
  const displayPost = (post) => {
    const parentDiv = document.getElementById("email-container");
  
    post.forEach((element) => {
      let active = "";
      if (element.isActive) {
        active = "#10B981";
      } else {
        active = "#FF3434";
      }
      const pass = element;
      const childDiv = document.createElement("div");
      childDiv.className =
        "w-full p-2 lg:p-10 flex flex-col lg:flex-row gap-3 lg:gap-6 bg-[#797DFC1A] rounded-3xl";
      childDiv.innerHTML = `
          <div
                  class="h-[60px] w-[60px] lg:w-[12%] bg-white rounded-xl flex justify-end relative"
                >
                <img src="${element.image}" class="w-full h-full rounded-xl" alt="" srcset="">
                  <span class="absolute top-[-5px] right-0"
                    ><i class="fa-solid fa-circle text-[${active}]"></i
                  ></span>
                </div>
  
                <div class="space-y-4">
                  <p># <span class="text-[14px] font-medium text-[#12132D99]">${element.category}</span> <br> <span class="text-[14px] font-medium text-[#12132D99]">Author:</span> <span class="text-[14px] font-medium text-[#12132D99]">${element.author.name}</span></p>
                  <h1 class="text-xl font-bold text-[#12132D]">${element.title}</h1>
                  <p class="text-base text-[#12132D99]">
                    ${element.description}
                  </p>
                  <hr class="border-dashed" />
                  <div class="flex justify-between items-center">
                    <p class="space-x-[1px] lg:space-x-2 text-[#12132D99]">
                      <i class="fa-regular fa-message"></i> <span>${element.comment_count}</span>
                      <i class="fa-regular fa-eye"></i>
                      <span>${element.view_count}</span>
                      <i class="fa-regular fa-clock"></i>
                      <span>${element.posted_time} min</span>
                    </p>
                    <span
                      class="bg-green-400 px-0 lg:px-1 h-[20px] w-[30px] rounded-full flex justify-center items-center"
                    >
                      <button onclick="envelopeClicked('${element.description}','${element.view_count}')">
                        <i class="fa-solid fa-envelope text-white"></i>
                      </button>
                    </span>
                  </div>
                </div>
          `;
      parentDiv.appendChild(childDiv);
    
    });
  };
  
  
  const latest = async () => {
    const res = await fetch(
      "https://openapi.programming-hero.com/api/retro-forum/latest-posts"
    );
  
    const data = await res.json();
    latestPost(data);
  };
  
  const latestPost = (data) => {
    data.forEach((object) => {
      console.log(object);
      const parentDiv = document.getElementById("latest-container");
  
      const childDiv = document.createElement("div");
      childDiv.className = "card w-[300px] lg:w-full bg-base-100 shadow-xl";
      childDiv.innerHTML = `
      <figure class="px-10 pt-10">
      <img src="${object.cover_image}" alt="Shoes" class="rounded-xl" />
    </figure>
    
    <div class="card-body ">
      <span class="text-[#12132D99]"><i class="fa-solid fa-calendar-days"></i> ${
        object.author?.posted_date || "No Publish Date"
      } </span>
      <h2 class="card-title text-lg font-extrabold">${object.title}</h2>
      <p class="text-[#12132D99]" >${object.description}</p>
      <div class="flex gap-2">
        <div><img class="border rounded-full w-[50px] h-[50px]" src="${
          object.profile_image
        }" alt="" srcset=""></div>
        <div>
          <h3 class="font-bold">${object.author.name}</h3>
          <h4 class="text-[14px]">${object.author?.designation || "Unknown"}</h4>
        </div>
      </div>
    </div>
      `;
      parentDiv.appendChild(childDiv);
    });
  };
  
  latest();
  
  const displayDataForCategory = (data) => {
    console.log("aise");
    const parentDiv = document.getElementById("email-container");
    parentDiv.innerText = "";
    setTimeout(()=>{
      data.forEach((element) => {
        let active = "";
        if (element.isActive) {
          active = "green";
        } else {
          active = "red";
        }
        const pass = element;
        const childDiv = document.createElement("div");
        childDiv.className =
          "w-full p-5 lg:p-10 flex flex-col lg:flex-row gap-3 lg:gap-6 bg-[#797DFC1A] rounded-3xl";
        childDiv.innerHTML = `
            <div
                    class="h-[50px] w-[50px] lg:w-[12%] bg-white rounded-xl flex justify-end relative">
                  <img src="${element.image}" class="w-full h-full rounded-xl" alt="" srcset="">
                    <span class="absolute top-[-5px] right-0"
                      ><i class="fa-solid fa-circle text-${active}-400"></i
                    ></span>
                  </div>
    
                  <div class="space-y-4">
                    <p># <span>${element.category}</span> Author: <span>${element.author.name}</span></p>
                    <h1>${element.title}</h1>
                    <p>
                      ${element.description}
                    </p>
                    <hr class="border-dashed" />
                    <div class="flex justify-between">
                      <p class="space-x-[1px] lg:space-x-2">
                        <i class="fa-regular fa-message"></i> <span>${element.comment_count}</span>
                        <i class="fa-regular fa-eye"></i>
                        <span>${element.view_count}</span>
                        <i class="fa-regular fa-clock"></i>
                        <span>${element.posted_time} min</span>
                      </p>
                      <span
                        class="bg-green-400 px-0 lg:px-1 h-[20px] w-[30px] rounded-full flex justify-center items-center"
                      >
                        <button onclick="envelopeClicked('${element.description}','${element.view_count}')">
                          <i class="fa-solid fa-envelope text-white"></i>
                        </button>
                      </span>
                    </div>
                  </div>
            `;
        parentDiv.appendChild(childDiv);
      });
      
      loadingSpinner(false);
    },2000);
    
  };
  
  
  const searchCatagory = () => {
    loadingSpinner(true);
    const search = document.getElementById("search-field").value;
  
    categoryData(search);
  };
  
  
  const loadingSpinner = (isLoading) => {
    const spinDiv = document.getElementById("spinner");
    if (isLoading) {
      spinDiv.classList.remove("hidden");
    } else {
      spinDiv.classList.add("hidden");
    }
  };

  const categoryData = async (text) => {
    const res = await fetch(
      `https://openapi.programming-hero.com/api/retro-forum/posts?category=${text}`
    );
  
    const data = await res.json();
    displayDataForCategory(data.posts);
  };

  loadData();
  let envelopeClickedtimes = 0;
  const envelopeClicked = (array, view_count) => {
    envelopeClickedtimes++;
    document.getElementById("mark-read").innerText =
      "(" + envelopeClickedtimes + ")";
  
    console.log("its clicked", array);
    const parentDiv = document.getElementById("mark-as-read");
    const childDiv = document.createElement("div");
    childDiv.className =
      "flex justify-evenly bg-[#FFFFFF] p-3 lg:p-5 rounded-lg items-center gap-2 lg:gap-4";
  
    childDiv.innerHTML = `
        <span class="text-[12px] lg:text-base font-semibold text-wrap">${array}</span>
          <span class="text-[10px] lg:text-base">
          <i class="fa-regular fa-eye text-[#12132D99]">${view_count}</i>
          </span>
        `;
    parentDiv.appendChild(childDiv);
  };