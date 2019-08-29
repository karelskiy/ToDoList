let todoList = [];

let out = () => {
	let out = '';
	for (let i in todoList) {
		if (todoList[i].check)
			out += `<span class='underlined' innerHTML=''><input type="checkbox" checked><span class='text'>${todoList[i].todo}</span><img class='edit' src="https://img.icons8.com/dotty/80/000000/edit.png"><img hidden class='save' src="https://img.icons8.com/ios/100/000000/save.png"><img class='remove' src="https://img.icons8.com/ios/50/000000/x.png"></span>`;
		else {
			out += `<span><input type="checkbox"><span>${todoList[i].todo}</span><img class='edit' src="https://img.icons8.com/dotty/80/000000/edit.png"><img hidden class='save' src="https://img.icons8.com/ios/50/000000/save.png"><img class='remove' src="https://img.icons8.com/ios/100/000000/x.png"></span>`;
		}
	}
	document.getElementById('out').innerHTML = out;
}


if (localStorage.getItem('todo')) {
	todoList = JSON.parse(localStorage.getItem('todo'));
	out();
}

document.getElementById('add').onclick = () => {
	let temp = {};
	let item = document.getElementById('in').value;

	temp.todo = item;
	temp.check = false;
	temp.edit = false;
	todoList.push(temp);

	out();
	document.getElementById('in').value = '';
	localStorage.setItem('todo', JSON.stringify(todoList));
}

document.getElementById('out').onchange = (event) => {
	let currentKey = event.target.parentNode.childNodes[1].innerText;

	for (let i in todoList) {
		if (todoList[i].todo == currentKey) {
			todoList[i].check = !todoList[i].check;
			out();
			localStorage.setItem('todo', JSON.stringify(todoList));
			break;
		} localStorage.setItem('todo', JSON.stringify(todoList));
	}
}


document.getElementById('out').onclick = (event) => {
	console.log(event.target.parentNode)
	let text = event.target.parentNode.children[1].innerText;
	if (event.target.className == 'remove') {
		event.target.parentNode.remove();
		for (let i in todoList) {
			if (todoList[i].todo == text) {
				let a = todoList.indexOf(todoList[i]);
				todoList.splice(a, 1);
				localStorage.setItem('todo', JSON.stringify(todoList));
			}
		}
	}

	if (event.target.className == 'edit') {
		let text = event.target.parentNode.children[1];
		let edit = event.target.parentNode.children[2];
		let save = event.target.parentNode.children[3];

		save.removeAttribute('hidden');
		edit.setAttribute('hidden', true);
		text.setAttribute('contenteditable', true);
		text.focus();

		for (let i in todoList) {
			if (todoList[i].todo == text.innerText) {
				todoList[i].edit = true;
				localStorage.setItem('todo', JSON.stringify(todoList));
			}
		}

		save.onclick = () => {
			for (let i in todoList) {
				if (todoList[i].edit) {
					todoList[i].todo = text.innerText;
					todoList[i].edit = false;
					localStorage.setItem('todo', JSON.stringify(todoList));
				}
			}
			save.setAttribute('hidden', true);
			edit.removeAttribute('hidden');
			text.removeAttribute('contenteditable');
		}
	}
}

document.getElementById('removeAll').onclick = () => {
	let list = document.querySelectorAll('.underlined');
	let newArr = Array.prototype.slice.call(list);

	for (let i in newArr) {
		newArr[i].style.display = 'none';
	}

	for (let i in todoList) {
		while (todoList[i].check) {
			let a = todoList.indexOf(todoList[i]);
			todoList.splice(a, 1);
			localStorage.setItem('todo', JSON.stringify(todoList));
		}
	}
}