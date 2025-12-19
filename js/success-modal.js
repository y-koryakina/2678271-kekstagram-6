const okButton = document.querySelector('.success__button');
const successBlock = document.querySelector('.success');


function onKeydown(evt) {
  if (evt.key !== 'Escape') {
    return;
  }

  evt.preventDefault();
  closeSuccessModal();
}

function onSuccessOverlayClick(evt) {
  if (evt.target === successBlock) {
    closeSuccessModal();
  }
}

function closeSuccessModal() {
  successBlock.classList.add('hidden');
  document.removeEventListener('keydown', onKeydown);
  successBlock.removeEventListener('click', onSuccessOverlayClick);

  okButton.removeEventListener('click', closeSuccessModal);
}

export const showSuccessModal = function (){
  successBlock.classList.remove('hidden');
  document.addEventListener('keydown', onKeydown);
  successBlock.addEventListener('click', onSuccessOverlayClick);

  okButton.addEventListener('click', closeSuccessModal);
};

