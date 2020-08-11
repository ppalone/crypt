const themeCheckbox = document.querySelector('#theme-checkbox');
const themeBall = document.querySelector('.ball');
const switchTheme = document.querySelector('.switch-theme-div');
let theme;

if (localStorage.getItem('crypt.theme')) {
	theme = localStorage.getItem('crypt.theme');
} else {
	localStorage.setItem('crypt.theme', 'light');
	theme = localStorage.setItem('crypt.theme', 'light');
}
document.body.classList.add(theme);

if (theme === 'dark') {
	themeCheckbox.checked = true;
	themeBall.style.transform = 'translateX(24px)';
}

switchTheme.style.display = 'flex';

themeCheckbox.addEventListener('change', () => {
	changeTheme();
});

const changeTheme = () => {
	if (themeCheckbox.checked === true) {
		localStorage.setItem('crypt.theme', 'dark');
		document.body.classList.add('dark');
		themeBall.style.transform = 'translateX(24px)';
	} else {
		localStorage.setItem('crypt.theme', 'light');
		document.body.classList.remove('dark');
		themeBall.style.transform = 'translateX(0px)';
	}
};
