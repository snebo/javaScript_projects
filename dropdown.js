export class Dropdown {
    constructor(container) {
        this.container = container
        if (!this.container) {
            throw new Error(`Dropdown container not found: ${containerSelector}`);
        }

        this.dropdownBtn = this.container.querySelector('.dropdown-btn');
        this.dropdownMenu = this.container.querySelector('.dropdown-menu');

        if (!this.dropdownBtn || !this.dropdownMenu) {
            throw new Error('Dropdown button or menu not found in the container');
        }

        this.init();
    }
    init() {
        this.dropdownBtn.addEventListener('click', () => this.toggleMenu());

        // Add click events to dropdown items
        this.dropdownMenu.querySelectorAll('.dropdown-item').forEach((item) => {
            item.addEventListener('click', (e) => this.selectItem(e.target));
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => this.handleOutsideClick(e));
    }
    toggleMenu() {
        this.dropdownMenu.classList.toggle('show')
    }
    selectItem(selectedItem) {
        this.dropdownMenu.classList.remove('show')
        this.dropdownBtn.textContent = `${selectedItem.textContent}`
    }
    handleOutsideClick(event) {
        if (!this.container.contains(event.target)) {
            this.dropdownMenu.classList.remove('show');
        }
    }

}