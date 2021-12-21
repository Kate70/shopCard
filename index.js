document.addEventListener('DOMContentLoaded', ()=>{


const productsBtn = document.querySelectorAll(".product__btn");
const cartProductList = document.querySelector(".card-content__list");
const card = document.querySelector(".card");
const cardQuantity = document.querySelector(".card__quantity");
const fullPrice = document.querySelector(".fullprice");
let price = 0;
let randomId = 0;


const normalPrice = (str)=>{
    return str.slice(0, 4);
}

const fullPrices=(currentPrice)=>{
    return price+=currentPrice;
}
const fullPriceMinus=(currentPrice)=>{
    return price-=currentPrice;
}
const printFullPrice =()=>{
    fullPrice.textContent = `${price} грн`
}
const printQuentity = ()=>{    
   
    let length = cartProductList.getElementsByTagName("li").length; 
    cardQuantity.textContent = length;
     length>0 ? card.classList.add('active'): card.classList.remove('active')
}


const deleteProd=(productParent)=>{
    let id = productParent.querySelector('.card-product').dataset.id;
    document.querySelector(`.product[data-id="${id}"]`).querySelector('.product__btn').disabled=false;
    let currentPrice = parseInt(normalPrice(productParent.querySelector('.card-product__price').textContent));
    fullPriceMinus(currentPrice);
    console.log(currentPrice);
    productParent.remove()
    printQuentity();
    printFullPrice ();
    updataStorage();

}

const  updataStorage =()=>{
    
    let parent = cartProductList;  
    let html = parent.innerHTML;
    html = html.trim();
    console.log(html);
    if(html.length){
        localStorage.setItem('products', html)
    }else{
        localStorage.removeItem('products')
    }
   
    
}
const generateCardProducr = (img, price, title, id) => {
  return `
    <li class="card-content__item">
            <article class="card-content__product card-product" data-id = ${id}>
                            <img src="${img}" alt="" class='card-product__img' >
                            <div class="card-product__text">
                                <h3 class="card-product__title">${title}</h3>
                            <span class="card-product__price">${price} грн</span>
                            </div>
                            <button class="card-product__delete"></button>
                        </article>
                    </li>            
    `;
};

productsBtn.forEach(el=>{
         
    el.closest('.product').setAttribute('data-id', ++randomId);
    el.addEventListener('click' ,(e)=>{
        let currentEl = e.currentTarget;
        let parent = currentEl.closest('.product');
        let id = parent.dataset.id
        let img = parent.querySelector('img').getAttribute('src')
        let title = parent.querySelector('.product-title').textContent;
        let priceNumber = parseInt(normalPrice(parent.querySelector('.product-price__current').textContent));
        console.log(price);

        fullPrices(priceNumber);
        printFullPrice();
        cartProductList.insertAdjacentHTML('afterbegin', generateCardProducr(img, priceNumber, title, id))
        printQuentity()
        updataStorage()
        currentEl.disabled = true;
    })
})

cartProductList.addEventListener('click', (e)=>{
      
    if(e.target.classList.contains('card-product__delete')){
               
   deleteProd(e.target.closest('.card-content__item'));
        
}})

const countSumm = ()=>{
    document.querySelector('.card-content__item').forEach(el =>{
        price += parseInt(normalPrice(el.querySelector('.card-product__price')).textContent);
        ;
    })
}
const initialState = ()=>{
    if(localStorage.getItem('products')!==null){
                console.log(localStorage.getItem('products'));
                
     cartProductList.insertAdjacentHTML('afterbegin', localStorage.getItem('products'));
     printQuentity();
     countSumm();
     printFullPrice();
    }
   }
   initialState();
});
