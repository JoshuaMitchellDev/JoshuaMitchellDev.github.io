// GitHub API
fetch('https://api.github.com/users/JoshuaMitchellDev')
  .then(r => r.json())
  .then(d => {
    const repos = d.public_repos || 0
    const followers = d.followers || 0
    document.getElementById('gh-repos').textContent = repos
    document.getElementById('gh-followers').textContent = followers
    document.getElementById('gh-repos-label').textContent = repos + ' public repos'
    document.getElementById('gh-followers-label').textContent = followers + ' followers'
  })
  .catch(() => {
    document.getElementById('gh-repos-label').textContent = 'github'
    document.getElementById('gh-followers-label').textContent = 'github'
  })

// Contact form — swap YOUR_FORM_ID once you have a Formspree account
document.getElementById('contact-form').addEventListener('submit', async function (e) {
  e.preventDefault()
  const btn = document.getElementById('send-btn')
  const msg = document.getElementById('form-msg')
  btn.disabled = true
  btn.textContent = 'sending...'
  try {
    const res = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        name: this.name.value,
        email: this.email.value,
        message: this.message.value,
      }),
    })
    if (res.ok) {
      msg.textContent = "✓ message sent — i'll get back to you soon"
      msg.className = 'form-msg success'
      this.reset()
    } else {
      throw new Error()
    }
  } catch {
    msg.textContent = '✗ something went wrong — try emailing directly'
    msg.className = 'form-msg error'
  }
  btn.disabled = false
  btn.textContent = 'send →'
})