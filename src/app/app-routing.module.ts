import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {SingleCoinComponent} from "./single-coin/single-coin.component";
import {ExchangesComponent} from "./exchanges/exchanges.component";
import {SingleExchangeComponent} from "./exchanges/single-exchange/single-exchange.component";
import {CoinAllComponent} from "./coin-all/coin-all.component";
import {LoginComponent} from "./login/login.component";
import {NewsComponent} from "./news/news.component";
import {AboutUsComponent} from "./about-us/about-us.component";
import {ProductIntroComponent} from "./about-us/product-intro/product-intro.component";
import {ServiceTermsComponent} from "./about-us/service-terms/service-terms.component";
import {AmlPolicyComponent} from "./about-us/aml-policy/aml-policy.component";
import {RegisterComponent} from "./login/register/register.component";
import {CommunityComponent} from "./community/community.component";
import {ProfileComponent} from "./community/profile/profile.component";
import {NotificationsComponent} from "./community/notifications/notifications.component";
import {PostComponent} from "./community/post/post.component";
import {FeedComponent} from "./community/feed/feed.component";
import {WalletComponent} from "./wallet/wallet.component";
import {WalletAccountComponent} from "./wallet/wallet-account/wallet-account.component";
import {PrivacyPolicyComponent} from "./about-us/privacy-policy/privacy-policy.component";
import {TradingPortalComponent} from "./trading-portal/trading-portal.component";
import {AccountComponent} from "./account/account.component";
import {WalletAssetComponent} from "./account/wallet-asset/wallet-asset.component";
import {DepositeComponent} from "./account/deposite/deposite.component";
import {MobileAcPageComponent} from "./account/mobile-ac-page/mobile-ac-page.component";
import {SettingsComponent} from "./account/mobile-ac-page/settings/settings.component";
import {KycComponent} from "./account/kyc/kyc.component";
import {PurchaseCryptoComponent} from "./purchase-crypto/purchase-crypto.component";
import {ForgotPasswordComponent} from "./forgot-password/forgot-password.component";
import {SetPasswordComponent} from "./set-password/set-password.component";
import {WalletMainComponent} from "./wallet-main/wallet-main.component";
import {MyAccountComponent} from "./my-account/my-account.component";
import {AccountSettingsComponent} from "./account-settings/account-settings.component";
import {CommunitySettingsComponent} from "./community-settings/community-settings.component";
import {SecurityComponent} from "./security/security.component";
import {PrivacyComponent} from "./privacy/privacy.component";
import {SupportComponent} from "./support/support.component";
import {EnvironmentComponent} from "./environment/environment.component";

const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'coins', component: CoinAllComponent},
    {path: 'coin/:id/:slug', component: SingleCoinComponent},
    {path: 'exchanges', component: ExchangesComponent},
    {path: 'exchange/:id/:slug', component: SingleExchangeComponent},
    {path: 'login', component: LoginComponent},
    {path: 'forgot-password', component: ForgotPasswordComponent},
    {path: 'set-password', component: SetPasswordComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'trade', component: TradingPortalComponent},
    {path: 'trade/:symbol', component: TradingPortalComponent},
    {
        path: 'community', component: CommunityComponent, children: [
            {path: '', redirectTo: 'feed', pathMatch: 'full'},
            {path: 'profile', component: ProfileComponent},
            {path: 'feed', component: FeedComponent},
            {path: 'notifications', component: NotificationsComponent},
            {path: 'post/:id', component: PostComponent},
        ]
    },
    {path: 'news', component: NewsComponent},
    {path: 'wallet', component: WalletComponent},
    {path: 'wallet/account', component: WalletAccountComponent},
    {path: 'wallet/main', component: WalletMainComponent},
    {path: 'wallet/purchase-crypto', component: PurchaseCryptoComponent},
    {
        path: 'about', component: AboutUsComponent, children: [
            {path: 'product-introduction', component: ProductIntroComponent},
            {path: 'service-terms', component: ServiceTermsComponent},
            {path: 'aml-policy', component: AmlPolicyComponent},
            {path: 'privacy-policy', component: PrivacyPolicyComponent},
        ]
    },
    {path: 'account', component: AccountComponent},
    {path: 'my-account', component: MyAccountComponent},
    {path: 'account-settings', component: AccountSettingsComponent},
    {path: 'community-settings', component: CommunitySettingsComponent},
    {path: 'security', component: SecurityComponent},
    {path: 'privacy', component: PrivacyComponent},
    {path: 'support', component: SupportComponent},
    {path: 'environment', component: EnvironmentComponent},
    {path: 'account/settings', component: SettingsComponent},
    {path: 'account-m', component: MobileAcPageComponent},
    {path: 'account/verification', component: KycComponent},
    {path: 'spot-wallet', component: WalletAssetComponent},
    {path: 'spot-wallet/deposit', component: DepositeComponent},
    {path: 'spot-wallet/buy', component: PurchaseCryptoComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
