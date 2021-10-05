"use strict";
console.log(document.body);
let koira = document.getElementById("koira");
// koira.textContent = "hauhau";

for (let index = 0; index < 10; index++) {
    let p = document.createElement('p');
    p.textContent = 'koira ' + index
    koira.appendChild(p);    
}
koira.style.color = 'grey';
let list =koira.children;
list[3].textContent= 'muutos';
list[0].style.fontWeight = 'bold';
console.log(document.links);
let pukki = document.getElementById("pukki");
console.log(pukki);

let li = document.getElementsByTagName('li');
for(let i = 0; i < li.length; i++) {
    li[i].style.backgroundColor = '#f4f4f4';
}

let header = document.querySelector('h1');
header.style.backgroundColor = 'grey';
let kissa2 = document.querySelector('li:nth-child(2)');
kissa2.style.backgroundColor = 'grey';

let kissat = document.querySelectorAll('.kissa');
kissat[0].style.fontWeight = 'bold';
kissat[1].style.fontWeight = 'bold';

let odd = document.querySelectorAll('li:nth-child(odd)');
for (let i = 0; i< odd.length; i++) {
    odd[i].style.fontWeight ='bold';
}

let itemList = document.querySelector('div');
console.log(itemList.children);
itemList.children[0].style.backgroundColor = 'red';
itemList.lastElementChild.textContent= 'Heihei mutsi';

console.log(itemList.previousElementSibling);

let newDiv = document.createElement('div');
newDiv.className = 'helo';
newDiv.setAttribute('title', 'HelloDiv');
let newDivText = document.createTextNode('Heihei world');
newDiv.appendChild(newDivText);
console.log(newDiv);
itemList.insertBefore(newDiv, itemList.children[2]);

let button2 = document.getElementById('button2').addEventListener('click', lisays);
let button = document.getElementById('button');
button.addEventListener('click', whatEvent);
button.addEventListener('mouseup', whatEvent);
button.addEventListener('mousedown', whatEvent);
button.addEventListener('dblclick', whatEvent);
button.addEventListener('mouseenter', whatEvent);

let itemInput = document.getElementById('text');

itemInput.addEventListener('keydown', whatEvent);
let select = document.getElementById('sel');
select.addEventListener('change', whatEvent);

function clicked() {
    console.log('klikattiin');
}

function lisays() {
    let p = document.createElement('p');
    p.addEventListener('click', poisto);
    p.textContent = 'koira syö' ;
    koira.appendChild(p);   
}

function poisto(e){
        e.target.style.backgroundColor= 'grey';
        if(e.altKey) {
            e.target.style.backgroundColor = 'red';
        }
}

function whatEvent(e) {
    console.log('event:' + e.type);
}