describe ('Quiz 3 - Automation Test Fitur Login OrangeHRM', () => {
    it('TC-01 - Login dengan username dan password kosong', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        cy.get('button[type="submit"]').click();
    });

    it('TC-02 - Login menggunakan username dan password yang benar', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        cy.get('input[name="username"]').type('Admin');
        cy.get('input[name="password"]').type('admin123');
        cy.get('button[type="submit"]').click();
    });

    it('TC-03 - Login menggunakan username yang benar dan password yang salah', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        cy.get('input[name="username"]').type('Admin');
        cy.get('input[name="password"]').type('admin');
        cy.get('button[type="submit"]').click();
    });

    it('TC-04 - Login menggunakan username tidak terdaftar di sistem', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        cy.get('input[name="username"]').type('Admin2');
        cy.get('input[name="password"]').type('admin2');
        cy.get('button[type="submit"]').click();
    });

    it('TC-05 - Login dengan username kosong dan password diisi', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        cy.get('input[name="password"]').type('admin123');
        cy.get('button[type="submit"]').click();
    });

    it('TC-06 - Login dengan username diisi dan password kosong', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        cy.get('input[name="username"]').type('Admin');
        cy.get('button[type="submit"]').click();
    });

    it('TC-07 - Login menggunakan username dan password yang salah', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        cy.get('input[name="username"]').type('admin');
        cy.get('input[name="password"]').type('admin');
        cy.get('button[type="submit"]').click();

        cy.get('.oxd-alert-content-text').should('be.visible').and('contain', 'Invalid credentials');
    });

    it('TC-08 - Membuka halaman Forgot Password', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        cy.contains('Forgot your password?').click();
        cy.url().should('include', '/auth/requestPasswordResetCode');
        cy.contains('h6', 'Reset Password').should('be.visible');
    });

    it('TC-09 - Membatalkan reset password dan kembali ke halaman login', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        cy.contains('Forgot your password?').click();
        cy.url().should('include', '/auth/requestPasswordResetCode');
        cy.contains('h6', 'Reset Password').should('be.visible');

        cy.get('button').contains('Cancel').click();
        cy.url().should('include', '/auth/login');
        cy.contains('h5', 'Login').should('be.visible');
    });

    it('TC-10 - Akses halaman Dashboard tanpa login', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index');
        cy.url().should('include', '/auth/login');
        cy.contains('h5', 'Login').should('be.visible');
    });

    it('TC-11 - Akses halaman Dasboard dengan sesi login aktif', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        cy.get('input[name="username"]').type('Admin');
        cy.get('input[name="password"]').type('admin123');
        cy.get('button[type="submit"]').click();

        cy.url().should('include', '/dashboard');
        cy.contains('Dashboard').should('be.visible');
        
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index');
        cy.url().should('include', '/dashboard');
        cy.contains('Dashboard').should('be.visible');
    });

    it('TC-12 - Mengakses youtube OrangeHRM', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        cy.get('a[href*="youtube"]').should('be.visible').and('have.attr', 'href').and('include', 'youtube');
    });
});