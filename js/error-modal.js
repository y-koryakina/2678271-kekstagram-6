const errorBlock = document.querySelector('.error');
const errorButton = errorBlock.querySelector('.error__button');

function onErrorKeydown(evt) {
  if (evt.key !== 'Escape') {
    return;
  }

  evt.preventDefault();
  closeErrorModal();
}

function onErrorOverlayClick(evt) {
  if (evt.target === errorBlock) {
    closeErrorModal();
  }
}

function closeErrorModal() {
  errorBlock.classList.add('hidden');
  document.removeEventListener('keydown', onErrorKeydown);
  errorBlock.removeEventListener('click', onErrorOverlayClick);
  errorButton.removeEventListener('click', closeErrorModal);
}

export const showErrorModal = function () {
  errorBlock.classList.remove('hidden');
  document.addEventListener('keydown', onErrorKeydown);
  errorBlock.addEventListener('click', onErrorOverlayClick);
  errorButton.addEventListener('click', closeErrorModal);
};
