const alertMessage = document.querySelector('.alert')

setTimeout(() => {
  if(!alertMessage) return clearTimeout(this)
  alertMessage.style.display = 'none'
}, 5000)


const archiveBtns = document.querySelectorAll('[data-type="archive"]')
const deleteBtns = document.querySelectorAll('[data-type="delete"]')

deleteBtns.forEach(btn => {
  btn.addEventListener('click', async () => {
    await fetch('/notes/delete/'+ btn.dataset.id, {
      method: 'DELETE'
    })
    btn.closest('li').style.display = 'none'
  })
})

archiveBtns.forEach(btn => {
  btn.addEventListener('click', async () => {
    await fetch('/archive/add/'+ btn.dataset.id, {
      method: 'POST'
    })
    btn.closest('li').style.display = 'none'
  })
})

const navLinks = document.querySelectorAll('.navigation a')

navLinks.forEach(link => {
  if(location.href === link.href) {
    link.classList.add('active')
  } else {
    link.classList.remove('active')
  }
})
