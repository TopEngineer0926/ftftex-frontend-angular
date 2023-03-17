import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import { HomeComponent } from './home/home.component';
import { CoinComponent } from './coin/coin.component';
import { HeaderComponent } from './fragments/header/header.component';
import { FooterComponent } from './fragments/footer/footer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NumberSuffixPipe } from './number-suffix.pipe';
import { SingleCoinComponent } from './single-coin/single-coin.component';
import { ChartModule } from '@syncfusion/ej2-angular-charts';
import { CategoryService, LegendService, TooltipService, DataLabelService, LineSeriesService , DateTimeService , CrosshairService , SparklineAllModule , StockChartAllModule, ChartAnnotationService, RangeNavigatorAllModule, ChartAllModule  } from '@syncfusion/ej2-angular-charts';
import { RemoveMinusPipe } from './remove-minus.pipe';
import { ShortHTTPPipe } from './short-http.pipe';
import { OverviewComponent } from './single-coin/overview/overview.component';
import { MarketsComponent } from './single-coin/markets/markets.component';
import { HistoryComponent } from './single-coin/history/history.component';
import { FromNowPipe } from './from-now.pipe';
import { MainCarousalComponent } from './home/main-carousal/main-carousal.component';
import { ExchangesComponent } from './exchanges/exchanges.component';
import { SingleExchangeComponent } from './exchanges/single-exchange/single-exchange.component';
import { SwiperModule } from "swiper/angular";
import { CoinAllComponent } from './coin-all/coin-all.component';
import { ContentLoaderModule } from '@netbasal/content-loader';
import { GainersAndLosersComponent } from './gainers-and-losers/gainers-and-losers.component';
import { TrendingCoinsComponent } from './trending-coins/trending-coins.component';
import {GlobalTrendingMetricsComponent} from "./global-trending-metrics/global-trending-metrics.component";
import { LoginComponent } from './login/login.component';
import { NewsComponent } from './news/news.component';
import { CandleChartComponent } from './single-coin/candle-chart/candle-chart.component';
import {OrderModule} from "ngx-order-pipe";
import {NgxPaginationModule} from 'ngx-pagination';
import { AboutUsComponent } from './about-us/about-us.component';
import { ProductIntroComponent } from './about-us/product-intro/product-intro.component';
import { ServiceTermsComponent } from './about-us/service-terms/service-terms.component';
import { AmlPolicyComponent } from './about-us/aml-policy/aml-policy.component';
import { NewsCarousalComponent } from './home/news-carousal/news-carousal.component';
import { NgxMarqueeModule } from 'ngx-marquee';
import { RegisterComponent } from './login/register/register.component';
import { CommunityComponent } from './community/community.component';
import { ProfileComponent } from './community/profile/profile.component';
import { NotificationsComponent } from './community/notifications/notifications.component';
import { PostComponent } from './community/post/post.component';
import { FeedComponent } from './community/feed/feed.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { DialingCodesComponent } from './login/dialing-codes/dialing-codes.component';
import { TadingviewtickerComponent } from './common/tadingviewticker/tadingviewticker.component';
import { TradingViewBuyAndSellComponent } from './common/trading-view-buy-and-sell/trading-view-buy-and-sell.component';
import { TradingViewTDChartComponent } from './single-coin/trading-view-td-chart/trading-view-td-chart.component';
import { MediaComponent } from './home/media/media.component';
import  {  NgxEmojiPickerModule  }  from  'ngx-emoji-picker';
import { WalletComponent } from './wallet/wallet.component';
import { WalletAccountComponent } from './wallet/wallet-account/wallet-account.component';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import { PrivacyPolicyComponent } from './about-us/privacy-policy/privacy-policy.component';
import { TradingPortalComponent } from './trading-portal/trading-portal.component';
import { AccountComponent } from './account/account.component';
import { WalletAssetComponent } from './account/wallet-asset/wallet-asset.component';
import { DepositeComponent } from './account/deposite/deposite.component';
import { BuyCryptoComponent } from './account/buy-crypto/buy-crypto.component';
import { SelectExchangePopComponent } from './coin/select-exchange-pop/select-exchange-pop.component';
import { MobileAcPageComponent } from './account/mobile-ac-page/mobile-ac-page.component';
import { SettingsComponent } from './account/mobile-ac-page/settings/settings.component';
import { OrderStatusPopComponent } from './trading-portal/order-status-pop/order-status-pop.component';
import { CoinSelectComponent } from './trading-portal/coin-select/coin-select.component';
import { KycComponent } from './account/kyc/kyc.component';
import {PurchaseCryptoComponent} from './purchase-crypto/purchase-crypto.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { SetPasswordComponent } from './set-password/set-password.component';
import { SafePipe } from './pipes/safe.pipe';
import {NgcCookieConsentConfig, NgcCookieConsentModule} from 'ngx-cookieconsent';
import { WalletMainComponent } from './wallet-main/wallet-main.component';
import { DepositComponent } from './wallet/deposit/deposit.component';
import {SelectNetworkComponent} from "./wallet/deposit/select-network/select-network.component";
import { DepositNetworkComponent } from './wallet/deposit/deposit-network/deposit-network.component';
import { TransferComponent } from './wallet/transfer/transfer.component';
import { WithdrawComponent } from './wallet/withdraw/withdraw.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { CommunitySettingsComponent } from './community-settings/community-settings.component';
import { SecurityComponent } from './security/security.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { SupportComponent } from './support/support.component';
import { EnvironmentComponent } from './environment/environment.component';

// AoT requires an exported function for factories
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

const cookieConfig:NgcCookieConsentConfig = {
  cookie: {
    domain: 'https://www.ftftex.com/'
  },
  palette: {
    popup: {
      background: '#000'
    },
    button: {
      background: '#1577ff'
    }
  },
  theme: 'classic',
  type: 'opt-out',
  layout: 'my-custom-layout',
  layouts: {
    "my-custom-layout": '{{messagelink}}{{compliance}}'
  },
  elements:{
    messagelink: `
    <span id="cookieconsent:desc" class="cc-message">{{message}} 
      <a aria-label="learn more about cookies" tabindex="0" class="cc-link" href="{{cookiePolicyHref}}" target="_blank" rel="noopener">{{cookiePolicyLink}}</a>
    </span>
    `,
  },
  content:{
    message: 'This website uses cookies to ensure you get the best experience in our website.',

    cookiePolicyLink: 'Learn More',
    cookiePolicyHref: 'https://www.ftftex.com/about/service-terms',
  }
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CoinComponent,
    HeaderComponent,
    FooterComponent,
    NumberSuffixPipe,
    SingleCoinComponent,
    RemoveMinusPipe,
    ShortHTTPPipe,
    OverviewComponent,
    MarketsComponent,
    HistoryComponent,
    FromNowPipe,
    MainCarousalComponent,
    ExchangesComponent,
    SingleExchangeComponent,
    CoinAllComponent,
    GainersAndLosersComponent,
    TrendingCoinsComponent,
    GlobalTrendingMetricsComponent,
    LoginComponent,
    NewsComponent,
    CandleChartComponent,
    AboutUsComponent,
    ProductIntroComponent,
    ServiceTermsComponent,
    AmlPolicyComponent,
    NewsCarousalComponent,
    RegisterComponent,
    CommunityComponent,
    ProfileComponent,
    NotificationsComponent,
    PostComponent,
    FeedComponent,
    DialingCodesComponent,
    TadingviewtickerComponent,
    TradingViewBuyAndSellComponent,
    TradingViewTDChartComponent,
    MediaComponent,
    WalletComponent,
    WalletAccountComponent,
    PrivacyPolicyComponent,
    TradingPortalComponent,
    AccountComponent,
    WalletAssetComponent,
    DepositeComponent,
    BuyCryptoComponent,
    SelectExchangePopComponent,
    MobileAcPageComponent,
    SettingsComponent,
    OrderStatusPopComponent,
    CoinSelectComponent,
    KycComponent,
    PurchaseCryptoComponent,
    ForgotPasswordComponent,
    SetPasswordComponent,
    SafePipe,
    WalletMainComponent,
    DepositComponent,
    SelectNetworkComponent,
    DepositNetworkComponent,
    TransferComponent,
    WithdrawComponent,
    MyAccountComponent,
    AccountSettingsComponent,
    CommunitySettingsComponent,
    SecurityComponent,
    PrivacyComponent,
    SupportComponent,
    EnvironmentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    ChartModule,
    SwiperModule,
    ContentLoaderModule,
    NgxPaginationModule,
    StockChartAllModule, RangeNavigatorAllModule, ChartAllModule, OrderModule, SparklineAllModule,
    NgxMarqueeModule, ReactiveFormsModule, FormsModule,
    NgxEmojiPickerModule.forRoot(),
    NgcCookieConsentModule.forRoot(cookieConfig),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    })
  ],
  providers: [ CategoryService, LegendService, TooltipService, DataLabelService, LineSeriesService , DateTimeService , CrosshairService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
