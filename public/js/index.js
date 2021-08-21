const alertMessage = document.querySelector('.alert')

setTimeout(() => {
  if(!alertMessage) return clearTimeout(this)
  alertMessage.style.display = 'none'
}, 5000)