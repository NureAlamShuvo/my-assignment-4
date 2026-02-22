let interviewList = [];
let rejectList = [];
let currentStatus = "btn-1";

let totalCount = document.getElementById("total-box");
let interviewCount = document.getElementById("interview-box");
let rejectCount = document.getElementById("reject-box");

let allJobCard = document.getElementById("all-job-card");
const mainSection = document.querySelector("main");
const filteredJobSection = document.getElementById("filtered-job-section");
const availableJobs = document.getElementById("available-job");

const btn1 = document.getElementById("btn-1");
const btn2 = document.getElementById("btn-2");
const btn3 = document.getElementById("btn-3");


function calculateCount() {
    totalCount.innerText = allJobCard.children.length;
    interviewCount.innerText = interviewList.length;
    rejectCount.innerText = rejectList.length;

    const totalJobCards = allJobCard.children.length;
    if(currentStatus === "btn-2"){
        availableJobs.innerText = `${interviewList.length} of ${totalJobCards} jobs`;
    }
    else if(currentStatus === "btn-3"){
        availableJobs.innerText = `${rejectList.length} of ${totalJobCards} jobs`;
    }
    else{
        availableJobs.innerText = `${totalJobCards} jobs`;
    }
};
calculateCount();


function toggleBtn(id) {

    btn1.className = "btn btn-active";
    btn2.className = "btn btn-active";
    btn3.className = "btn btn-active";

    const selected = document.getElementById(id);
    selected.className = "btn btn-primary";

    currentStatus = id;

    if(id === "btn-2"){
        allJobCard.classList.add("hidden");
        filteredJobSection.classList.remove("hidden");
        render();
    }
    else if(id === "btn-1"){
        allJobCard.classList.remove("hidden");
        filteredJobSection.classList.add("hidden");
    }
    else if(id === "btn-3"){
        allJobCard.classList.add("hidden");
        filteredJobSection.classList.remove("hidden");
        renderReject();
    }

    calculateCount();
};

mainSection.addEventListener("click", function (event) {


    if (event.target.classList.contains('interview-btn')) {
        let parentNode = event.target.parentNode.parentNode;
        if(!parentNode.querySelector(".company-name")){
            parentNode = parentNode.parentNode.parentNode;
        };
        const companyName = parentNode.querySelector('.company-name').innerText;
        const jobType = parentNode.querySelector('.job-type').innerText;
        const salary = parentNode.querySelector('.salary').innerText;
        const discription = parentNode.querySelector('.discription').innerText;
        const notAppliedBtn = parentNode.querySelector('.not-applied-btn').innerText;
        parentNode.querySelector('.not-applied-btn').innerText = "INTERVIEW";
        parentNode.querySelector('.not-applied-btn').classList.remove("hidden");

        const allCards = allJobCard.querySelectorAll(".job-card");
        allCards.forEach(card => {
            if(card.querySelector(".company-name").innerText === companyName){
                card.querySelector(".not-applied-btn").innerText = "INTERVIEW";
                card.querySelector(".not-applied-btn").classList.remove("hidden");
            }
        });

        const jobsInfo = {
            companyName,
            jobType,
            salary,
            notAppliedBtn,
            discription
        };

        const interviewExist = interviewList.find(item => item.companyName === jobsInfo.companyName);
        
        if (!interviewExist) {
            interviewList.push(jobsInfo);
        };

        rejectList = rejectList.filter(item => item.companyName !== jobsInfo.companyName);

        toggleBtn("btn-2");

        calculateCount();

    };
    if (event.target.classList.contains('reject-btn')) {
        let parentNode = event.target.parentNode.parentNode;
        if(!parentNode.querySelector(".company-name")){
            parentNode = parentNode.parentNode.parentNode;
        };
        const companyName = parentNode.querySelector('.company-name').innerText;
        const jobType = parentNode.querySelector('.job-type').innerText;
        const salary = parentNode.querySelector('.salary').innerText;
        const discription = parentNode.querySelector('.discription').innerText;
        const notAppliedBtn = parentNode.querySelector('.not-applied-btn').innerText;
        parentNode.querySelector('.not-applied-btn').innerText = "REJECTED";
        parentNode.querySelector('.not-applied-btn').classList.remove("hidden");

        const allCards = allJobCard.querySelectorAll(".job-card");
        allCards.forEach(card => {
            if(card.querySelector(".company-name").innerText === companyName){
                card.querySelector(".not-applied-btn").innerText = "REJECTED";
                card.querySelector(".not-applied-btn").classList.remove("hidden");
            }
        });

        const jobsInfo = {
            companyName,
            jobType,
            salary,
            notAppliedBtn,
            discription
        };

        const interviewExist = rejectList.find(item => item.companyName === jobsInfo.companyName);
        
        if (!interviewExist) {
            rejectList.push(jobsInfo);
        };

        interviewList = interviewList.filter(item => item.companyName !== jobsInfo.companyName);

        toggleBtn("btn-3");

        calculateCount();
        
    };

    if(event.target.classList.contains("delete-btn")){
            const deleteCard = event.target.closest(".job-card");
            deleteCard.remove();
            calculateCount();
        };
});


function render() {
    
    filteredJobSection.innerHTML = '';

    for (let interview of interviewList) {

        let divCreat = document.createElement("div");
        divCreat.className = "flex justify-between bg-[#F1F2F4] rounded-lg p-6 mt-4";
        divCreat.innerHTML = `
        <div>
                    <div class="space-y-5">
                        <div class="space-y-5">
                            <h2 class="company-name text-[#002C5C] text-2xl font-bold">${interview.companyName}</h2>
                            <p class="job-type text-[#64748B] font-medium">${interview.jobType}</p>
                            <p class="salary text-[#64748B] font-medium">${interview.salary}</p>
                        </div>
                        <div class="space-y-3">
                            <button class="not-applied-btn btn btn-soft text-[#002C5C] bg-[#EEF4FF] hidden">Not
                                Applied</button>
                            <p class="discription text-[#323B49] font-medium">${interview.discription}</p>
                        </div>
                        <div>
                            <button class="interview-btn btn btn-outline btn-success">Interview</button>
                            <button class="reject-btn btn btn-outline btn-error">Rejected</button>
                        </div>
                    </div>
                </div>
                <div class="">
                    <a href="" class="delete-btn border-gray-400 border rounded-full p-1 bg-gray-100"><i
                    class="fa-regular fa-trash-can"></i></a>
                </div>
        `
        filteredJobSection.appendChild(divCreat);
        const notAppliedButton = divCreat.querySelector(".not-applied-btn");
        notAppliedButton.classList.remove("hidden");
        notAppliedButton.innerText = "INTERVIEW";

    };

    if(interviewList.length === 0){
            filteredJobSection.innerHTML = `    
        <div class="text-center py-16 bg-[#F1F2F4] rounded-lg mt-4">
            <img src="./image/jobs.png" class="w-32 mx-auto mb-4">
            <h2 class="text-2xl font-bold text-[#002C5C] mb-2">No jobs available</h2>
            <p class="text-[#64748B]">Check back soon for new job opportunities</p>
        </div>
        `;
        };
};


function renderReject() {

    filteredJobSection.innerHTML = '';

    for (let reject of rejectList) {

        let divCreat = document.createElement("div");
        divCreat.className = "flex justify-between bg-[#F1F2F4] rounded-lg p-6 mt-4";
        divCreat.innerHTML = `
        <div>
                    <div class="space-y-5">
                        <div class="space-y-5">
                            <h2 class="company-name text-[#002C5C] text-2xl font-bold">${reject.companyName}</h2>
                            <p class="job-type text-[#64748B] font-medium">${reject.jobType}</p>
                            <p class="salary text-[#64748B] font-medium">${reject.salary}</p>
                        </div>
                        <div class="space-y-3">
                            <button class="not-applied-btn btn btn-soft text-[#002C5C] bg-[#EEF4FF] hidden">Not
                                Applied</button>
                            <p class="discription text-[#323B49] font-medium">${reject.discription}</p>
                        </div>
                        <div>
                            <button class="interview-btn btn btn-outline btn-success">Interview</button>
                            <button class="reject-btn btn btn-outline btn-error">Rejected</button>
                        </div>
                    </div>
                </div>
                <div class="">
                    <a href="" class="delete-btn border-gray-400 border rounded-full p-1 bg-gray-100"><i
                    class="fa-regular fa-trash-can"></i></a>
                </div>
        `
        filteredJobSection.appendChild(divCreat);
        const notAppliedButton = divCreat.querySelector(".not-applied-btn");
        notAppliedButton.classList.remove("hidden");
        notAppliedButton.innerText = "REJECTED";

    };

    if(rejectList.length === 0){
            filteredJobSection.innerHTML = `    
        <div class="text-center py-16 bg-[#F1F2F4] rounded-lg mt-4">
            <img src="./image/jobs.png" class="w-32 mx-auto mb-4">
            <h2 class="text-2xl font-bold text-[#002C5C] mb-2">No jobs available</h2>
            <p class="text-[#64748B]">Check back soon for new job opportunities</p>
        </div>
        `;
        };
};