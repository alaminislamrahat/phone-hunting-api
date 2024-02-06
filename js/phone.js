const loadPhone = async (searchText, isShow) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
  const data = await res.json();
  const phones = data.data;
  
  if(data.data.length === 0){
    showNotFound()
  }
  if(data.data.length > 0){
    displayPhones(phones, isShow);
  }

}


const showNotFound = ()=>{
  show_notfound_modal.showModal();
  const notFoundModal = document.getElementById('not-found-modal');
  notFoundModal.innerHTML = `<h1 class="text-xl  text-red-600">Data not found</h1>`;
  

}


// relod the page when click not found modal btn 
const reloadPage = ()=>{
  location.reload();
}


const displayPhones = (phones, isShow) => {
 
  const phoneContainer = document.getElementById('phone-container');
  phoneContainer.textContent = '';

  const btnContainer = document.getElementById('btn-container');

  // show button when element more than 12 
  if (phones.length > 12 && !isShow) {
    btnContainer.classList.remove('hidden');
  }
  else {
    btnContainer.classList.add('hidden');
  }



  // display only 1st 12 phones 
  if (!isShow) {
    phones = phones.slice(0, 12);
  }
  

  phones.forEach(phone => {
    const phoneCard = document.createElement('div');
    phoneCard.classList = `card bg-base-100 shadow-xl p-4`;
    phoneCard.innerHTML = `
        <figure><img src=${phone.image} alt="Shoes" /></figure>
        <div class="card-body">
          <h2 class="card-title">${phone.phone_name}</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div class="card-actions justify-end">
            <button onclick="showDetail('${phone.slug}')" class="btn btn-primary">show detail</button>
          </div>
        </div>
      </div>
        `;
    phoneContainer.appendChild(phoneCard)
  });

  // hide toggle spinner 
  toggleLoadingSpinner(false);

};



// handle search button 
const handleSearch = (isShow) => {
  toggleLoadingSpinner(true);
  const searchField = document.getElementById('search-field');
  const searchText = searchField.value;
  loadPhone(searchText, isShow);
  
};


const toggleLoadingSpinner = (isLoading) => {
  const loadingSpinner = document.getElementById('loading-spinner');
  if (isLoading) {
    loadingSpinner.classList.remove('hidden');
  }
  else {
    loadingSpinner.classList.add('hidden');
  }

};


// show all handler 
const showAll = () => {
  handleSearch(true);
}


// show detail 
const showDetail = async (id) => {
  console.log('clicked', id);

  // single phone detail 
  const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
  const data = await res.json();
  const phone = data.data;
  console.log(phone);
  showPhoneDetail(phone);


}


const showPhoneDetail = (phone) => {
  show_detail_modal.showModal();
  const phoneDetailBox = document.getElementById('phone-detail-box');
  phoneDetailBox.innerHTML = `
                    <img src="${phone?.image}" alt="">
                     <h1 class="md:text-3xl font-bold">Model: ${phone?.name}</h1>
                      <p class="md:text-xl font-bold">Brand name : ${phone?.brand}</p>
                      
                      <p>Display : ${phone?.mainFeatures?.displaySize}</p>
                      <p>Memory : ${phone?.mainFeatures?.memory}</p>
                      <p>Storage : ${phone?.mainFeatures?.storage}</p>
                      <p>Chip set : ${phone?.mainFeatures?.chipSet}</p>
                      <p>Release Date : ${phone?.releaseDate}</p>
                      <p>Slug : ${phone?.slug}</p>
                      
                      
`
}


