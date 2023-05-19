const crud = {
  posts: [

  ],
  createPost(dados) {
    const id = dados.id;
    const idData = Date.now();
    crud.posts.push({
      id: id || idData,
      owner: dados.owner,
      content: dados.content
    });
    const uList = document.querySelector('ul');
    uList.insertAdjacentHTML('afterbegin',
      `<li data-id="${id || idData}">
            <span class="owner">${dados.owner}:</span><span class="content" contentEditable="false">${dados.content}</span>
            <input type="checkbox" class="checkmark" id="checkmark${id || idData}">
            <button class="edit">✐ </button>
            <button class="deletar">🗑️</button>
        </li>`)

  },
  deletePost(id) {
    const novaLista = crud.posts.filter((postAtual) => {
      return postAtual.id !== Number(id);
    })
    crud.posts = novaLista;
  },
  editPost(id, newContent) {
    const editablePost = crud.posts.find((post) => {
      return post.id === Number(id);
    });
    editablePost.content = newContent;
  }

}
function findPosts() {
  return crud.posts;
}

//submit e create post no html
const form = document.querySelector('form');

form.addEventListener('submit', function createPostControl(infos) {
  infos.preventDefault();
  const texto = this.querySelector('input[name="campoCriaPost"]');
  if (texto.value ) {
    crud.createPost({ owner: 'You', content: texto.value })
    texto.value = ''
    console.log(crud.posts)
  }

});


//delete post html
document.querySelector('.listaDePost').addEventListener('click', function deletaPostControl(infos) {
  const elementoAtual = infos.target;
  const isBtnDeleteClick = infos.target.classList.contains('deletar');
  if (isBtnDeleteClick) {
    const id = elementoAtual.parentNode.getAttribute('data-id');
    crud.deletePost(Number(id));
    elementoAtual.parentNode.remove();
    console.log(crud.posts)
  }
})


// edit post html
document.querySelector('.listaDePost').addEventListener('input', function editPostInfos(infos) {
  const elementoAtual = infos.target;
  const id = elementoAtual.parentNode.getAttribute('data-id');
  const isBtnCheck = infos.target.classList.contains('checkmark');

  if (isBtnCheck) {
    const pai = elementoAtual.parentNode;
    const filho = pai.childNodes;
    const spanEditavel = filho[2];
    const btnenable = filho[6];
    if (spanEditavel.style.textDecoration == "line-through") {
      spanEditavel.style.textDecoration = "none";
      btnenable.style.cursor = "pointer"
      btnenable.disabled = false
    } else {
      spanEditavel.style.textDecoration = "line-through"
      btnenable.style.cursor = "default"
      btnenable.disabled = true
    }
  } else {
    crud.editPost(id, elementoAtual.innerText);
    console.log(crud.posts);
  }

});

document.querySelector('.listaDePost').addEventListener('click', function editPostControl(infos) {
  const elementoAtual = infos.target;
  const isBtnEditClick = infos.target.classList.contains('edit');
  if (isBtnEditClick) {
    const pai = elementoAtual.parentNode;
    const filho = pai.childNodes;
    const spanEditavel = filho[2];
    if (spanEditavel.contentEditable == "true") {
      spanEditavel.contentEditable = false;
      elementoAtual.innerHTML = "✐";
    } else {
      spanEditavel.contentEditable = true;
      elementoAtual.innerHTML = "✎";
    };

  };
});






