import { Page, Locator } from '@playwright/test';

export class LoginPage {
   readonly page: Page;
   readonly usernameInput: Locator;
   readonly passwordInput: Locator;
   readonly loginButton: Locator;
   readonly errorMessage: Locator;
   readonly menuButton: Locator;
   readonly logoutLink: Locator;
   
    constructor(page : Page){
        this.page = page;

        //Locators
        this.usernameInput = page.locator('[data-test="username"]');
        this.passwordInput = page.locator('[data-test="password"]');
        this.loginButton   = page.locator('[data-test="login-button"]');
        this.errorMessage  = page.locator('[data-test="error"]');
        this.menuButton    = page.locator('#react-burger-menu-btn');
        this.logoutLink    = page.locator('#logout_sidebar_link');


    }


    async login(username: string, password: string): Promise<void> {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();

        
    }
    async navigateToLoginPage(): Promise<void> {
       await this.page.goto('/');
        
    }

}