(function () {
  var burger = document.querySelector('.burger');
  var nav = document.querySelector('.nav');
  var headerPhone = document.querySelector('.header__phone');

  if (burger && nav) {
    burger.addEventListener('click', function () {
      var isOpen = nav.classList.contains('nav_open');
      nav.classList.toggle('nav_open');
      if (headerPhone) headerPhone.classList.toggle('header__phone_visible', !isOpen);
      burger.setAttribute('aria-expanded', !isOpen);
    });
  }

  var form = document.getElementById('request-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = (form.querySelector('[name="name"]') || {}).value || '';
      var phoneRaw = (form.querySelector('[name="phone"]') || {}).value || '';
      var phone = phoneRaw.replace(/\D/g, '');
      if (phone.length === 11 && phone[0] === '8') phone = '7' + phone.slice(1);
      if (phone.length === 10) phone = '7' + phone;
      var goal = (form.querySelector('[name="goal"]:checked') || {}).value;
      var goalText = goal === 'calculation' ? 'Хочу получить расчёт.' : 'Хочу обсудить проект.';
      var text = 'Здравствуйте! ' + goalText + '\nИмя: ' + name + '\nТелефон: +' + phone;
      var url = 'https://t.me/Leopard777?text=' + encodeURIComponent(text);
      window.open(url, '_blank', 'noopener');
    });
  }

  (function phoneMask() {
    var input = document.getElementById('request-phone');
    if (!input) return;
    input.addEventListener('input', function () {
      var v = this.value.replace(/\D/g, '');
      if (v.length > 0) {
        if (v[0] === '8') v = '7' + v.slice(1);
        if (v[0] !== '7') v = '7' + v;
      }
      v = v.slice(0, 11);
      if (v.length <= 1) {
        this.value = v ? '+7' : '';
        return;
      }
      var s = '+7';
      if (v.length > 1) s += ' (' + v.slice(1, 4);
      if (v.length >= 4) s += ') ' + v.slice(4, 7);
      if (v.length >= 7) s += '-' + v.slice(7, 9);
      if (v.length >= 9) s += '-' + v.slice(9, 11);
      this.value = s;
    });
    input.addEventListener('focus', function () {
      if (this.value.replace(/\D/g, '').length === 0) this.value = '+7 ';
    });
    input.addEventListener('blur', function () {
      if (this.value === '+7 ' || this.value === '+7') this.value = '';
    });
  })();

  (function backToTop() {
    var btn = document.getElementById('back-to-top');
    if (!btn) return;
    function toggle() {
      if (window.scrollY > 400) {
        btn.classList.add('visible');
      } else {
        btn.classList.remove('visible');
      }
    }
    window.addEventListener('scroll', toggle, { passive: true });
    toggle();
    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  })();
})();
