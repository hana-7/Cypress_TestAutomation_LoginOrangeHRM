describe ('Tugas 16 - Intercept', () => {
    it('TC-01 - Login dengan username dan password kosong', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

        cy.intercept('POST','https://opensource-demo.orangehrmlive.com/web/index.php/core/i18n/messages').as('emptyLogin');

        cy.get('button[type="submit"]').click();

        cy.get('.oxd-input-field-error-message').should('have.length', 2);
        
        cy.get('@emptyLogin.all').should('have.length', 0);
    });

    it('TC-02 - Login menggunakan username dan password yang benar', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        cy.get('input[name="username"]').type('Admin');
        cy.get('input[name="password"]').type('admin123');

        cy.intercept('GET','https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/dashboard/shortcuts').as('validLogin');

        cy.get('button[type="submit"]').click();

        cy.wait('@validLogin').its('response.statusCode').should('eq',200);
    });

    it('TC-03 - Login menggunakan username yang benar dan password yang salah', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        cy.get('input[name="username"]').type('Admin');
        cy.get('input[name="password"]').type('admin');

        cy.intercept('POST','https://opensource-demo.orangehrmlive.com/web/index.php/auth/validate').as('wrongPassword');

        cy.get('button[type="submit"]').click();

        cy.wait('@wrongPassword').its('response.statusCode').should('eq',302);
    });

    it('TC-04 - Login menggunakan username tidak terdaftar di sistem', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        cy.get('input[name="username"]').type('Admin2');
        cy.get('input[name="password"]').type('admin2');

        cy.intercept('POST','https://opensource-demo.orangehrmlive.com/web/index.php/auth/validate').as('wrongUsername');

        cy.get('button[type="submit"]').click();

        cy.wait('@wrongUsername').its('response.statusCode').should('eq',302);
    });

    it('TC-05 - Login dengan username kosong dan password diisi', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        cy.get('input[name="password"]').type('admin123');

        cy.intercept('POST','https://opensource-demo.orangehrmlive.com/web/index.php/core/i18n/messages').as('emptyUsername');
        cy.get('button[type="submit"]').click();

        cy.get('.oxd-input-field-error-message').should('have.length', 1);
        
        cy.get('@emptyUsername.all').should('have.length', 0);
    });

    it('TC-06 - Login dengan username diisi dan password kosong', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

        cy.intercept('POST','https://opensource-demo.orangehrmlive.com/web/index.php/core/i18n/messages').as('emptyPassword');
        cy.get('input[name="username"]').type('Admin');
        cy.get('button[type="submit"]').click();

        cy.get('.oxd-input-field-error-message').should('have.length', 1);
        
        cy.get('@emptyPassword.all').should('have.length', 0);
    });

    it('TC-07 - Login menggunakan username dan password yang salah', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        cy.get('input[name="username"]').type('admin');
        cy.get('input[name="password"]').type('admin');

        cy.intercept('POST','https://opensource-demo.orangehrmlive.com/web/index.php/auth/validate').as('notValidLogin');

        cy.get('button[type="submit"]').click();

        cy.wait('@notValidLogin');

        cy.get('.oxd-alert-content-text').should('be.visible').and('contain', 'Invalid credentials');
    });

    it('TC-08 - Membuka halaman Forgot Password', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

        cy.intercept('GET','https://opensource-demo.orangehrmlive.com/web/index.php/auth/requestPasswordResetCode').as('forgotPasswordPage');

        cy.contains('Forgot your password?').click();

        cy.wait('@forgotPasswordPage').its('response.statusCode').should('eq',200);

        cy.url().should('include', '/auth/requestPasswordResetCode');
        cy.contains('h6', 'Reset Password').should('be.visible');
    });

    // it('TC-09 - Membatalkan reset password dan kembali ke halaman login', () => {
    //     cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    //     cy.contains('Forgot your password?').click();
    //     cy.url().should('include', '/auth/requestPasswordResetCode');
    //     cy.contains('h6', 'Reset Password').should('be.visible');

    //     cy.get('button').contains('Cancel').click();
    //     cy.url().should('include', '/auth/login');
    //     cy.contains('h5', 'Login').should('be.visible');
    // });

    // it('TC-10 - Akses halaman Dashboard tanpa login', () => {
    //     cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index');
    //     cy.url().should('include', '/auth/login');
    //     cy.contains('h5', 'Login').should('be.visible');
    // });

    // it('TC-11 - Akses halaman Dasboard dengan sesi login aktif', () => {
    //     cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    //     cy.get('input[name="username"]').type('Admin');
    //     cy.get('input[name="password"]').type('admin123');
    //     cy.get('button[type="submit"]').click();

    //     cy.url().should('include', '/dashboard');
    //     cy.contains('Dashboard').should('be.visible');
        
    //     cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index');
    //     cy.url().should('include', '/dashboard');
    //     cy.contains('Dashboard').should('be.visible');
    // });

    // it('TC-12 - Mengakses youtube OrangeHRM', () => {
    //     cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    //     cy.get('a[href*="youtube"]').should('be.visible').and('have.attr', 'href').and('include', 'youtube');
    // });
});