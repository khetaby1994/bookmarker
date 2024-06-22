var nameInput=document.getElementById("siteName")
var urlInput=document.getElementById("siteUrl")
var bookmarkList=[]

//   ====================          Validate URL         ===================

        // route code
// var nameRegex = /^\w{3,}(\s+\w+)*$/;
// var urlRegex = /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/;

// nameInput.addEventListener("input", function () {
//   validate(nameInput, nameRegex);
// });

// urlInput.addEventListener("input", function () {
//   validate(urlInput, urlRegex);
// });

// function validate(element, regex) {
//   var testRegex = regex;
//   if (testRegex.test(element.value)) {
//     element.classList.add("valid");
//     element.classList.remove("invalid");
//   } else {
//     element.classList.add("invalid");
//     element.classList.remove("valid");
//   }
// }

        // ==========      my code       ==========

var nameRegex = /^\w{3,}(\s+\w+)*$/;
var urlRegex = /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/;

function validateName() {
  if (nameRegex.test(nameInput.value)) {
    nameInput.classList.add("valid");
    nameInput.classList.remove("invalid");
  } else {
    nameInput.classList.add("invalid");
    nameInput.classList.remove("valid");
  }
}

function validateUrl() {
  if (urlRegex.test(urlInput.value)) {
    urlInput.classList.add("valid");
    urlInput.classList.remove("invalid");
  } else {
    urlInput.classList.add("invalid");
    urlInput.classList.remove("valid");
  }
}



//   ====================          add Bookmark, show added and clear         ===================
        //   ====================add Bookmark===================
function saveBookmark() {
    // var site={
    //     name:nameInput.value,
    //     url:urlInput.value,
    // }
    if (nameInput.classList.contains('valid') && urlInput.classList.contains('valid')) {
        var urlModif
        if (urlInput.value.includes('https:')) {
            urlModif=urlInput.value.replace('https:','')
        }
    
        var site={
            name:nameInput.value,
            url:urlModif
        }
        
        bookmarkList.push(site);
        localStorage.setItem('bookmark',JSON.stringify(bookmarkList))
        showAdded()
        clearInputs()
        
    } else{
        window.alert('not valid bookmark')
    }
}
    //   ====================show added===================
function showAdded() {
    var lastIndex=bookmarkList.length-1
    var row='';
    row=`
    <tr>
        <th scope="row">${lastIndex+1}</th>
        <td>${bookmarkList[lastIndex].name}</td>
        <td scope="col">
        <a href="https://${bookmarkList[lastIndex].url}" target="_blank" class="btn btn-visit text-white"><i class="fa-solid fa-eye"></i> Visit</a>
        <td scope="col">
            <button type="button" onclick="deleteBookmark(${lastIndex})" class="btn btn-delete text-white">
                <i class="fa-solid fa-trash"></i> Delete
            </button>
        </td>
    </tr>
    `;
    document.getElementById('rowCont').innerHTML+=row
}

    //   ====================clear===================
function clearInputs() {
    nameInput.value='';
    urlInput.value='';
    
}

//   ====================          show saved bookmark        ===================
if (localStorage.getItem('bookmark')!=null) {
    bookmarkList=JSON.parse(localStorage.getItem('bookmark'))
}
function showSaved(list) {
    var row='';
    for (let i = 0; i < list.length; i++) {
        row+=`
        <tr>
            <th scope="row">${i+1}</th>
            <td>${list[i].name}</td>
            <td scope="col">
            <a href="https://${list[i].url}" target="_blank" class="btn btn-visit text-white"><i class="fa-solid fa-eye"></i> Visit</a>
            <td scope="col">
            <button type="button" onclick="deleteBookmark(${i})" class="btn btn-delete text-white">
            <i class="fa-solid fa-trash"></i> Delete
                </button>
            </td>
        </tr>
        `;        
    }
    document.getElementById('rowCont').innerHTML=row
}
showSaved(bookmarkList);

//   ====================          delete bookmark        ===================
function deleteBookmark(index) {
    bookmarkList.splice(index,1);
    localStorage.setItem('bookmark',JSON.stringify(bookmarkList));
    showSaved(bookmarkList);
}
