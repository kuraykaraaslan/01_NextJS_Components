'use client';
import { useState } from 'react';
import { Sidebar, type NavGroup } from './Sidebar';
import { TopBar } from './TopBar';
import { Widget } from './Widget';
import { CopyButton } from './CopyButton';
import { cn } from '@/libs/utils/cn';
import { buildShowcaseData, type ShowcaseVariant } from '@/modules/showcase/data/showcase.data';

// ─── Nav groups ────────────────────────────────────────────────────────────────

const NAV_GROUPS: NavGroup[] = [
  {
    label: 'Atoms',
    items: [
      { id: 'button',       title: 'Button',            category: 'Atom', abbr: 'Bt' },
      { id: 'button-group', title: 'ButtonGroup',       category: 'Atom', abbr: 'BG' },
      { id: 'badge',        title: 'Badge',             category: 'Atom', abbr: 'Bg' },
      { id: 'avatar',       title: 'Avatar',            category: 'Atom', abbr: 'Av' },
      { id: 'spinner',      title: 'Spinner',           category: 'Atom', abbr: 'Sp' },
      { id: 'skeleton',     title: 'Skeleton',          category: 'Atom', abbr: 'Sk' },
      { id: 'skip-link',    title: 'SkipLink + Live',   category: 'Atom', abbr: 'Sl' },
    ],
  },
  {
    label: 'Molecules',
    items: [
      { id: 'input',             title: 'Input',            category: 'Molecule', abbr: 'In' },
      { id: 'checkbox',          title: 'Checkbox',         category: 'Molecule', abbr: 'Cb' },
      { id: 'radio-group',       title: 'RadioGroup',       category: 'Molecule', abbr: 'Rg' },
      { id: 'select',            title: 'Select',           category: 'Molecule', abbr: 'Sl' },
      { id: 'multi-select',      title: 'MultiSelect',      category: 'Molecule', abbr: 'Ms' },
      { id: 'textarea',          title: 'Textarea',         category: 'Molecule', abbr: 'Ta' },
      { id: 'search-bar',        title: 'SearchBar',        category: 'Molecule', abbr: 'Sb' },
      { id: 'toggle',            title: 'Toggle',           category: 'Molecule', abbr: 'Tg' },
      { id: 'date-picker',       title: 'DatePicker',       category: 'Molecule', abbr: 'Dp' },
      { id: 'date-range-picker', title: 'DateRangePicker',  category: 'Molecule', abbr: 'Dr' },
      { id: 'checkbox-group',    title: 'CheckboxGroup',    category: 'Molecule', abbr: 'Cg' },
      { id: 'tag-input',         title: 'TagInput',         category: 'Molecule', abbr: 'Ti' },
      { id: 'combo-box',         title: 'ComboBox',         category: 'Molecule', abbr: 'Cx' },
      { id: 'file-input',        title: 'FileInput',        category: 'Molecule', abbr: 'Fi' },
    ],
  },
  {
    label: 'Organisms',
    items: [
      { id: 'card',                title: 'Card',               category: 'Organism', abbr: 'Ca' },
      { id: 'alert-banner',        title: 'AlertBanner',        category: 'Organism', abbr: 'Ab' },
      { id: 'toast',               title: 'Toast',              category: 'Organism', abbr: 'To' },
      { id: 'empty-state',         title: 'EmptyState',         category: 'Organism', abbr: 'Es' },
      { id: 'pagination',          title: 'Pagination',         category: 'Organism', abbr: 'Pg' },
      { id: 'modal',               title: 'Modal',              category: 'Organism', abbr: 'Md' },
      { id: 'drawer',              title: 'Drawer',             category: 'Organism', abbr: 'Dr' },
      { id: 'tooltip',             title: 'Tooltip',            category: 'Organism', abbr: 'Tt' },
      { id: 'dropdown-menu',       title: 'DropdownMenu',       category: 'Organism', abbr: 'Dm' },
      { id: 'popover',             title: 'Popover',            category: 'Organism', abbr: 'Po' },
      { id: 'table',               title: 'Table',              category: 'Organism', abbr: 'Tb' },
      { id: 'tab-group',           title: 'TabGroup',           category: 'Organism', abbr: 'Tg' },
      { id: 'breadcrumb',          title: 'Breadcrumb',         category: 'Organism', abbr: 'Bc' },
      { id: 'data-table',          title: 'DataTable',          category: 'Organism', abbr: 'Dt' },
      { id: 'advanced-data-table', title: 'AdvancedDataTable',  category: 'Organism', abbr: 'At' },
      { id: 'stepper',             title: 'Stepper',            category: 'Organism', abbr: 'St' },
      { id: 'tree-view',           title: 'TreeView',           category: 'Organism', abbr: 'Tv' },
      { id: 'content-score-bar',   title: 'ContentScoreBar',    category: 'Organism', abbr: 'Cs' },
      { id: 'page-header',         title: 'PageHeader',         category: 'Organism', abbr: 'Ph' },
    ],
  },
  {
    label: 'App Patterns',
    items: [
      { id: 'app-notifications',    title: 'Notifications',      category: 'App', abbr: 'Ns' },
      { id: 'app-global-search',    title: 'GlobalSearch',       category: 'App', abbr: 'Gs' },
      { id: 'app-confirm-dialog',   title: 'ConfirmDialog',      category: 'App', abbr: 'Cd' },
      { id: 'app-detail-header',    title: 'DetailHeader',       category: 'App', abbr: 'Dh' },
      { id: 'app-filter-bar',       title: 'FilterBar',          category: 'App', abbr: 'Fb' },
      { id: 'app-data-listing',     title: 'DataListingPage',    category: 'App', abbr: 'Dl' },
      { id: 'app-create-edit-form', title: 'CreateEditForm',     category: 'App', abbr: 'Ce' },
      { id: 'app-file-upload',      title: 'FileUploadSection',  category: 'App', abbr: 'Fu' },
      { id: 'app-empty-error',      title: 'EmptyErrorState',    category: 'App', abbr: 'Ee' },
      { id: 'app-loading-state',    title: 'LoadingState',       category: 'App', abbr: 'Ls' },
      { id: 'app-step-flow',        title: 'StepFlow',           category: 'App', abbr: 'Sf' },
      { id: 'app-accessibility',    title: 'AccessibilityKit',   category: 'App', abbr: 'Ak' },
    ],
  },
  {
    label: 'App Layout',
    sectionStart: 'App Layout',
    items: [
      { id: 'app-nav',         title: 'AppNav',        category: 'App', abbr: 'An' },
      { id: 'app-drawer',      title: 'AppDrawer',     category: 'App', abbr: 'Ad' },
      { id: 'app-topbar',      title: 'AppTopBar',     category: 'App', abbr: 'At' },
      { id: 'app-footer',      title: 'AppFooter',     category: 'App', abbr: 'Af' },
      { id: 'app-sidebar',     title: 'AppSidebar',    category: 'App', abbr: 'As' },
      { id: 'app-command-bar', title: 'AppCommandBar',  category: 'App', abbr: 'Ac' },
      { id: 'app-breadcrumbs', title: 'AppBreadcrumbs', category: 'App', abbr: 'Ab' },
      { id: 'app-global-search', title: 'GlobalSearch', category: 'App', abbr: 'Gs' },
    ],
  },
  // ─── Domain verticals ──────────────────────────────────────────────────────
  {
    label: 'E-Commerce',
    sectionStart: 'Domain Components',
    items: [
      { id: 'ec-product-card',     title: 'ProductCard',          category: 'Domain', abbr: 'Pc' },
      { id: 'ec-variant-picker',   title: 'VariantPicker',        category: 'Domain', abbr: 'Vp' },
      { id: 'ec-add-to-cart',      title: 'AddToCartPanel',       category: 'Domain', abbr: 'Ac' },
      { id: 'ec-cart-summary',     title: 'CartSummary',          category: 'Domain', abbr: 'Cs' },
      { id: 'ec-checkout-address', title: 'CheckoutAddressStep',  category: 'Domain', abbr: 'Ca' },
    ],
  },
  {
    label: 'FinTech',
    items: [
      { id: 'ft-balance-card',    title: 'AccountBalanceCard',      category: 'Domain', abbr: 'Ab' },
      { id: 'ft-ledger',          title: 'TransactionLedger',       category: 'Domain', abbr: 'Tl' },
      { id: 'ft-transfer-form',   title: 'TransferForm',            category: 'Domain', abbr: 'Tf' },
      { id: 'ft-beneficiary',     title: 'BeneficiaryPicker',       category: 'Domain', abbr: 'Bp' },
      { id: 'ft-spending-chart',  title: 'SpendingCategoryChart',   category: 'Domain', abbr: 'Sc' },
    ],
  },
  {
    label: 'Healthcare',
    items: [
      { id: 'hc-patient-card',    title: 'PatientSummaryCard',    category: 'Domain', abbr: 'Ps' },
      { id: 'hc-appointment',     title: 'AppointmentCalendar',   category: 'Domain', abbr: 'Ap' },
      { id: 'hc-prescription',    title: 'PrescriptionEditor',    category: 'Domain', abbr: 'Pe' },
      { id: 'hc-vitals',          title: 'VitalSignsChart',       category: 'Domain', abbr: 'Vs' },
      { id: 'hc-lab-results',     title: 'LabResultTable',        category: 'Domain', abbr: 'Lr' },
    ],
  },
  {
    label: 'Education',
    items: [
      { id: 'ed-course-progress', title: 'CourseProgressCard',      category: 'Domain', abbr: 'Cp' },
      { id: 'ed-lesson-player',   title: 'LessonPlayerShell',       category: 'Domain', abbr: 'Lp' },
      { id: 'ed-quiz-builder',    title: 'QuizBuilder',             category: 'Domain', abbr: 'Qb' },
      { id: 'ed-quiz-result',     title: 'QuizResultBreakdown',     category: 'Domain', abbr: 'Qr' },
      { id: 'ed-assignment',      title: 'AssignmentSubmission',    category: 'Domain', abbr: 'As' },
    ],
  },
  {
    label: 'Logistics',
    items: [
      { id: 'lg-shipment-board',  title: 'ShipmentStatusBoard',  category: 'Domain', abbr: 'Sb' },
      { id: 'lg-route-map',       title: 'RouteMapSidePanel',    category: 'Domain', abbr: 'Rm' },
      { id: 'lg-delivery-slot',   title: 'DeliverySlotPicker',   category: 'Domain', abbr: 'Ds' },
      { id: 'lg-warehouse-bin',   title: 'WarehouseBinView',     category: 'Domain', abbr: 'Wb' },
      { id: 'lg-driver-table',    title: 'DriverAssignmentTable',category: 'Domain', abbr: 'Da' },
    ],
  },
  {
    label: 'HR',
    items: [
      { id: 'hr-candidate-board', title: 'CandidatePipelineBoard',  category: 'Domain', abbr: 'Cb' },
      { id: 'hr-interview',       title: 'InterviewScheduleMatrix', category: 'Domain', abbr: 'Is' },
      { id: 'hr-leave-request',   title: 'LeaveRequestCard',        category: 'Domain', abbr: 'Lr' },
      { id: 'hr-payroll',         title: 'PayrollBreakdown',        category: 'Domain', abbr: 'Pb' },
      { id: 'hr-performance',     title: 'PerformanceReviewForm',   category: 'Domain', abbr: 'Pr' },
    ],
  },
  {
    label: 'Real Estate',
    items: [
      { id: 're-property-card',   title: 'PropertyCard',          category: 'Domain', abbr: 'Pc' },
      { id: 're-floor-plan',      title: 'FloorPlanViewer',       category: 'Domain', abbr: 'Fp' },
      { id: 're-availability',    title: 'AvailabilityCalendar',  category: 'Domain', abbr: 'Ac' },
      { id: 're-mortgage',        title: 'MortgageEstimator',     category: 'Domain', abbr: 'Me' },
      { id: 're-offer-compare',   title: 'OfferComparisonTable',  category: 'Domain', abbr: 'Oc' },
    ],
  },
  {
    label: 'Travel',
    items: [
      { id: 'tr-flight-search',   title: 'FlightSearchPanel',    category: 'Domain', abbr: 'Fs' },
      { id: 'tr-fare-compare',    title: 'FareComparisonTable',  category: 'Domain', abbr: 'Fc' },
      { id: 'tr-seat-map',        title: 'SeatMapSelector',      category: 'Domain', abbr: 'Sm' },
      { id: 'tr-itinerary',       title: 'ItineraryTimeline',    category: 'Domain', abbr: 'It' },
      { id: 'tr-hotel-room',      title: 'HotelRoomPicker',      category: 'Domain', abbr: 'Hr' },
    ],
  },
  {
    label: 'Content',
    items: [
      { id: 'ct-article-editor',  title: 'ArticleEditor',           category: 'Domain', abbr: 'Ae' },
      { id: 'ct-seo-score',       title: 'SEOScorePanel',           category: 'Domain', abbr: 'Se' },
      { id: 'ct-approval-flow',   title: 'ContentApprovalWorkflow', category: 'Domain', abbr: 'Ca' },
      { id: 'ct-revision-diff',   title: 'RevisionDiffViewer',      category: 'Domain', abbr: 'Rd' },
      { id: 'ct-publish',         title: 'PublishScheduler',        category: 'Domain', abbr: 'Ps' },
    ],
  },
  {
    label: 'Manufacturing',
    items: [
      { id: 'mf-production-line', title: 'ProductionLineStatus',  category: 'Domain', abbr: 'Pl' },
      { id: 'mf-work-order',      title: 'WorkOrderBoard',        category: 'Domain', abbr: 'Wo' },
      { id: 'mf-machine-health',  title: 'MachineHealthCard',     category: 'Domain', abbr: 'Mh' },
      { id: 'mf-downtime',        title: 'DowntimeReasonPicker',  category: 'Domain', abbr: 'Dr' },
      { id: 'mf-inventory',       title: 'InventoryReorderPanel', category: 'Domain', abbr: 'Ir' },
    ],
  },
  // ─── News Portal ────────────────────────────────────────────────────────────
  {
    label: 'News – Home',
    sectionStart: 'News Portal',
    items: [
      { id: 'nw-news-hero-slider', title: 'NewsHeroSlider',     category: 'Domain', abbr: 'Nh' },
      { id: 'nw-breaking-ticker', title: 'BreakingNewsTicker',  category: 'Domain', abbr: 'Bt' },
      { id: 'nw-featured-grid',   title: 'FeaturedNewsGrid',    category: 'Domain', abbr: 'Fg' },
      { id: 'nw-top-stories',     title: 'TopStoriesList',      category: 'Domain', abbr: 'Ts' },
      { id: 'nw-category-strip',  title: 'CategoryStrip',       category: 'Domain', abbr: 'Cs' },
    ],
  },
  {
    label: 'News – Listing',
    items: [
      { id: 'nw-category-header', title: 'NewsCategoryPageHeader', category: 'Domain', abbr: 'Ch' },
      { id: 'nw-feed-list',       title: 'NewsFeedList',           category: 'Domain', abbr: 'Fl' },
      { id: 'nw-infinite-feed',   title: 'InfiniteNewsFeed',       category: 'Domain', abbr: 'If' },
      { id: 'nw-trending-panel',  title: 'TrendingTopicsPanel',    category: 'Domain', abbr: 'Tp' },
      { id: 'nw-topic-filter',    title: 'TopicFilterBar',         category: 'Domain', abbr: 'Tf' },
    ],
  },
  {
    label: 'News – Article',
    items: [
      { id: 'nw-article-header',   title: 'ArticleHeader',       category: 'Domain', abbr: 'Ah' },
      { id: 'nw-article-body',     title: 'ArticleBody',         category: 'Domain', abbr: 'Ab' },
      { id: 'nw-article-gallery',  title: 'ArticleGallery',      category: 'Domain', abbr: 'Ag' },
      { id: 'nw-related-articles', title: 'RelatedArticles',     category: 'Domain', abbr: 'Ra' },
      { id: 'nw-author-card',      title: 'AuthorCard',          category: 'Domain', abbr: 'Ac' },
      { id: 'nw-live-update',      title: 'LiveUpdatePanel',     category: 'Domain', abbr: 'Lu' },
      { id: 'nw-source-citation',  title: 'SourceCitationBox',   category: 'Domain', abbr: 'Sc' },
    ],
  },
  {
    label: 'News – Interaction',
    items: [
      { id: 'nw-comment-list',     title: 'CommentList',           category: 'Domain', abbr: 'Cl' },
      { id: 'nw-comment-composer', title: 'CommentComposer',       category: 'Domain', abbr: 'Cc' },
      { id: 'nw-reactions-bar',    title: 'ReactionsBar',          category: 'Domain', abbr: 'Rb' },
      { id: 'nw-share-panel',      title: 'SharePanel',            category: 'Domain', abbr: 'Sp' },
      { id: 'nw-save-later',       title: 'SaveForLaterButton',    category: 'Domain', abbr: 'Sl' },
    ],
  },
  {
    label: 'News – Discovery',
    items: [
      { id: 'nw-search-results',   title: 'SearchResultsPage',     category: 'Domain', abbr: 'Sr' },
      { id: 'nw-advanced-search',  title: 'AdvancedSearchFilters', category: 'Domain', abbr: 'As' },
      { id: 'nw-topic-explorer',   title: 'TopicExplorer',         category: 'Domain', abbr: 'Te' },
      { id: 'nw-popular-tags',     title: 'PopularTagsCloud',      category: 'Domain', abbr: 'Pt' },
      { id: 'nw-regional-news',    title: 'RegionalNewsSelector',  category: 'Domain', abbr: 'Rn' },
    ],
  },
  {
    label: 'News – Subscription',
    items: [
      { id: 'nw-newsletter-signup', title: 'NewsletterSignupCard',      category: 'Domain', abbr: 'Ns' },
      { id: 'nw-paywall-modal',     title: 'SubscriptionPaywallModal',  category: 'Domain', abbr: 'Pm' },
      { id: 'nw-plan-cards',        title: 'SubscriptionPlanCards',     category: 'Domain', abbr: 'Pc' },
      { id: 'nw-consent-prefs',     title: 'ConsentPreferences',        category: 'Domain', abbr: 'Cp' },
    ],
  },
  {
    label: 'News – Monetization',
    items: [
      { id: 'nw-ad-slot',        title: 'AdSlotBanner',         category: 'Domain', abbr: 'Ad' },
      { id: 'nw-sponsored-card', title: 'SponsoredContentCard', category: 'Domain', abbr: 'Sp' },
      { id: 'nw-donation-cta',   title: 'DonationCTA',          category: 'Domain', abbr: 'Dc' },
    ],
  },
  {
    label: 'News – Editorial',
    items: [
      { id: 'nw-editor-dashboard',   title: 'EditorDashboard',       category: 'Domain', abbr: 'Ed' },
      { id: 'nw-draft-editor',       title: 'ArticleDraftEditor',    category: 'Domain', abbr: 'De' },
      { id: 'nw-publish-scheduler',  title: 'PublishingScheduler',   category: 'Domain', abbr: 'Ps' },
      { id: 'nw-review-approval',    title: 'ReviewApprovalPanel',   category: 'Domain', abbr: 'Ra' },
      { id: 'nw-breaking-composer',  title: 'BreakingNewsComposer',  category: 'Domain', abbr: 'Bc' },
    ],
  },
  {
    label: 'News – SEO & Utility',
    items: [
      { id: 'nw-breadcrumb-nav',    title: 'BreadcrumbNav',          category: 'Domain', abbr: 'Bn' },
      { id: 'nw-reading-progress',  title: 'ReadingProgressBar',     category: 'Domain', abbr: 'Rp' },
      { id: 'nw-toc',               title: 'TableOfContents',        category: 'Domain', abbr: 'Tc' },
      { id: 'nw-a11y-skiplink',     title: 'AccessibilitySkipLink',  category: 'Domain', abbr: 'Al' },
      { id: 'nw-error-empty',       title: 'ErrorOrEmptyState',      category: 'Domain', abbr: 'Ee' },
    ],
  },
  // ─── Industry Verticals ────────────────────────────────────────────────────
  {
    label: 'SaaS / B2B',
    sectionStart: 'Industry Verticals',
    items: [
      { id: 'saas-dashboard-kpi',    title: 'DashboardKpiGrid',     category: 'Domain', abbr: 'Dk' },
      { id: 'saas-team-table',       title: 'TeamMemberTable',      category: 'Domain', abbr: 'Tt' },
      { id: 'saas-role-matrix',      title: 'RolePermissionMatrix', category: 'Domain', abbr: 'Rm' },
      { id: 'saas-billing-plan',     title: 'BillingPlanCard',      category: 'Domain', abbr: 'Bp' },
      { id: 'saas-api-keys',         title: 'ApiKeyManager',        category: 'Domain', abbr: 'Ak' },
      { id: 'saas-notif-center',     title: 'NotificationCenter',   category: 'Domain', abbr: 'Nc' },
    ],
  },
  {
    label: 'Restaurant / Order',
    items: [
      { id: 'rest-menu-tabs',        title: 'MenuCategoryTabs',            category: 'Domain', abbr: 'Mt' },
      { id: 'rest-product-card',     title: 'RestaurantProductCard',       category: 'Domain', abbr: 'Pc' },
      { id: 'rest-cart-summary',     title: 'CartSummaryPanel',            category: 'Domain', abbr: 'Cs' },
      { id: 'rest-delivery-slot',    title: 'RestaurantDeliverySlotPicker', category: 'Domain', abbr: 'Ds' },
      { id: 'rest-order-tracking',   title: 'OrderTrackingTimeline',       category: 'Domain', abbr: 'Ot' },
      { id: 'rest-kitchen-queue',    title: 'KitchenQueueBoard',           category: 'Domain', abbr: 'Kq' },
    ],
  },
  {
    label: 'Event / Ticketing',
    items: [
      { id: 'evnt-navbar',           title: 'EventNavbar',            category: 'Domain', abbr: 'En' },
      { id: 'evnt-card',             title: 'EventCard',              category: 'Domain', abbr: 'Ec' },
      { id: 'evnt-list-card',        title: 'EventListCard',          category: 'Domain', abbr: 'El' },
      { id: 'evnt-hero-card',        title: 'EventHeroCard',          category: 'Domain', abbr: 'Eh' },
      { id: 'evnt-ticket-tier',      title: 'TicketTierSelector',     category: 'Domain', abbr: 'Tt' },
      { id: 'evnt-seat-map',         title: 'EventSeatMapSelector',   category: 'Domain', abbr: 'Sm' },
      { id: 'evnt-checkout',         title: 'CheckoutStepper',        category: 'Domain', abbr: 'Cs' },
      { id: 'evnt-attendee-form',    title: 'AttendeeForm',           category: 'Domain', abbr: 'Af' },
      { id: 'evnt-refund-modal',     title: 'RefundRequestModal',     category: 'Domain', abbr: 'Rf' },
    ],
  },
  {
    label: 'Social / Forum',
    items: [
      { id: 'soc-feed-composer',     title: 'FeedComposer',           category: 'Domain', abbr: 'Fc' },
      { id: 'soc-post-card',         title: 'ForumPostCard',          category: 'Domain', abbr: 'Fp' },
      { id: 'soc-comment-thread',    title: 'CommentThread',          category: 'Domain', abbr: 'Ct' },
      { id: 'soc-reactions',         title: 'ForumReactionBar',       category: 'Domain', abbr: 'Rb' },
      { id: 'soc-tag-cloud',         title: 'TopicTagCloud',          category: 'Domain', abbr: 'Tc' },
      { id: 'soc-moderation',        title: 'ModerationQueuePanel',   category: 'Domain', abbr: 'Mq' },
    ],
  },
  {
    label: 'Video / Streaming',
    items: [
      { id: 'vid-player-shell',      title: 'VideoPlayerShell',        category: 'Domain', abbr: 'Vp' },
      { id: 'vid-episode-list',      title: 'EpisodeListPanel',        category: 'Domain', abbr: 'El' },
      { id: 'vid-recommendations',   title: 'RecommendationCarousel',  category: 'Domain', abbr: 'Rc' },
      { id: 'vid-watchlist',         title: 'WatchlistManager',        category: 'Domain', abbr: 'Wm' },
      { id: 'vid-subtitle-audio',    title: 'SubtitleAudioSelector',   category: 'Domain', abbr: 'Sa' },
      { id: 'vid-live-chat',         title: 'LiveChatPanel',           category: 'Domain', abbr: 'Lc' },
    ],
  },
  {
    label: 'Energy / Utility',
    items: [
      { id: 'enrg-kpi-card',         title: 'ConsumptionKpiCard',       category: 'Domain', abbr: 'Ck' },
      { id: 'enrg-meter-table',      title: 'MeterReadingTable',        category: 'Domain', abbr: 'Mr' },
      { id: 'enrg-outage-board',     title: 'OutageStatusBoard',        category: 'Domain', abbr: 'Os' },
      { id: 'enrg-tariff-compare',   title: 'TariffComparisonPanel',    category: 'Domain', abbr: 'Tc' },
      { id: 'enrg-peak-alert',       title: 'PeakUsageAlertPanel',      category: 'Domain', abbr: 'Pa' },
      { id: 'enrg-maintenance',      title: 'MaintenanceScheduleTable', category: 'Domain', abbr: 'Ms' },
    ],
  },
  {
    label: 'Legal / Case Mgmt',
    items: [
      { id: 'legl-case-header',      title: 'CaseSummaryHeader',       category: 'Domain', abbr: 'Ch' },
      { id: 'legl-case-timeline',    title: 'CaseTimeline',            category: 'Domain', abbr: 'Ct' },
      { id: 'legl-hearing-cal',      title: 'HearingCalendar',         category: 'Domain', abbr: 'Hc' },
      { id: 'legl-evidence-lib',     title: 'DocumentEvidenceLibrary', category: 'Domain', abbr: 'De' },
      { id: 'legl-task-board',       title: 'TaskDeadlineBoard',       category: 'Domain', abbr: 'Tb' },
      { id: 'legl-risk-indicator',   title: 'LegalRiskIndicator',      category: 'Domain', abbr: 'Lr' },
    ],
  },
  {
    label: 'Government / E-Gov',
    items: [
      { id: 'govt-service-catalog',  title: 'ServiceCatalogGrid',         category: 'Domain', abbr: 'Sc' },
      { id: 'govt-app-wizard',       title: 'ApplicationWizard',          category: 'Domain', abbr: 'Aw' },
      { id: 'govt-citizen-profile',  title: 'CitizenProfileCard',         category: 'Domain', abbr: 'Cp' },
      { id: 'govt-doc-upload',       title: 'DocumentUploadPanel',        category: 'Domain', abbr: 'Du' },
      { id: 'govt-status-tracking',  title: 'StatusTrackingTimeline',     category: 'Domain', abbr: 'St' },
      { id: 'govt-complaint-form',   title: 'ComplaintRequestForm',       category: 'Domain', abbr: 'Cf' },
    ],
  },
  // ─── Mobility ─────────────────────────────────────────────────────────────────
  {
    label: 'Mobility / Rental',
    sectionStart: 'Mobility',
    items: [
      { id: 'mb-vehicle-card',  title: 'VehicleCard',         category: 'Domain', abbr: 'Vc' },
      { id: 'mb-search-panel',  title: 'VehicleSearchPanel',  category: 'Domain', abbr: 'Vs' },
      { id: 'mb-specs-panel',   title: 'VehicleSpecsPanel',   category: 'Domain', abbr: 'Sp' },
      { id: 'mb-rental-start',  title: 'RentalStartPanel',    category: 'Domain', abbr: 'Rs' },
      { id: 'mb-active-rental', title: 'ActiveRentalPanel',   category: 'Domain', abbr: 'Ar' },
    ],
  },
  // ─── Themes ───────────────────────────────────────────────────────────────────
  {
    label: 'Themes',
    sectionStart: 'Themes',
    items: [
      { id: 'theme-news',    title: 'News Site',        category: 'Theme', abbr: 'Nw', href: '/theme/news/' },
      { id: 'theme-shop',    title: 'E-Commerce Shop',  category: 'Theme', abbr: 'Sh', href: '/theme/shop/' },
      { id: 'theme-rental',  title: 'Vehicle Rental',   category: 'Theme', abbr: 'Mv', href: '/theme/rental/' },
      { id: 'theme-tickets', title: 'Ticketing',        category: 'Theme', abbr: 'Tk', href: '/theme/tickets/' },
    ],
  },
];

const categoryStyles: Record<string, string> = {
  Atom:     'bg-info-subtle text-info-fg',
  Molecule: 'bg-primary-subtle text-primary',
  Organism: 'bg-success-subtle text-success-fg',
  App:      'bg-warning-subtle text-warning-fg',
  Domain:   'bg-error-subtle text-error-fg',
  Theme:    'bg-secondary text-primary-fg',
};

// ─── SourceBlock ───────────────────────────────────────────────────────────────

function SourceBlock({ filePath, sourceCode }: { filePath: string; sourceCode: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-surface-raised border border-border rounded-xl overflow-hidden">
      <div className="widget-drag-handle flex items-center justify-between gap-3 px-4 py-3 border-b border-border bg-surface-overlay">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-text-disabled text-xs shrink-0 select-none" aria-hidden="true">⠿</span>
          <span className="text-sm font-semibold text-text-primary">Source</span>
          <span className="font-mono text-xs text-text-secondary bg-surface-sunken px-2 py-0.5 rounded truncate">
            {filePath}
          </span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <CopyButton code={sourceCode} />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? 'Collapse source' : 'Expand source'}
            className={cn(
              'px-2.5 py-1 text-xs rounded-md font-medium transition-colors',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus',
              'bg-surface-overlay text-text-secondary hover:text-text-primary hover:bg-surface-sunken'
            )}
          >
            {open ? 'Collapse' : 'Expand'}
          </button>
        </div>
      </div>
      {open && (
        <div className="bg-surface-sunken overflow-x-auto">
          <pre className="px-5 py-5 text-sm font-mono text-text-primary leading-relaxed">
            <code>{sourceCode}</code>
          </pre>
        </div>
      )}
    </div>
  );
}

// ─── VariantBlock ──────────────────────────────────────────────────────────────

function VariantBlock({ variant }: { variant: ShowcaseVariant }) {
  const stack = variant.layout === 'stack';

  return (
    <div className="bg-surface-raised border border-border rounded-xl overflow-hidden">
      <Widget
        title={variant.title}
        headerRight={<CopyButton code={variant.code} />}
      >
        <div className={cn(
          'flex divide-border',
          stack
            ? 'flex-col divide-y'
            : 'flex-col sm:flex-row divide-y sm:divide-y-0 sm:divide-x'
        )}>
          {/* Preview */}
          <div className={cn('flex flex-col', !stack && 'sm:w-2/5')}>
            <div className="px-3 py-1.5 border-b border-border bg-surface-overlay">
              <span className="text-xs font-medium text-text-secondary uppercase tracking-wider">Preview</span>
            </div>
            <div
              className={cn(
                'flex items-start justify-center px-6 py-8',
                stack ? 'min-h-40' : 'flex-1 min-h-28'
              )}
              style={{
                backgroundImage: 'radial-gradient(circle, var(--border) 1px, transparent 1px)',
                backgroundSize: '16px 16px',
              }}
            >
              <div className={cn('w-full', !stack && 'flex flex-wrap gap-2 items-center justify-center')}>
                {variant.preview}
              </div>
            </div>
          </div>
          {/* Code */}
          <div className={cn('flex flex-col bg-surface-sunken overflow-x-auto', !stack && 'flex-1')}>
            <div className="px-3 py-1.5 border-b border-border bg-surface-overlay">
              <span className="text-xs font-medium text-text-secondary uppercase tracking-wider">Code</span>
            </div>
            <pre className="flex-1 px-4 py-5 text-sm font-mono text-text-primary leading-relaxed whitespace-pre-wrap">
              <code>{variant.code}</code>
            </pre>
          </div>
        </div>
      </Widget>
    </div>
  );
}

// ─── Shell ────────────────────────────────────────────────────────────────────

export function ShowcaseShell() {
  const data = buildShowcaseData();
  const dataMap = Object.fromEntries(data.map((c) => [c.id, c]));

  const [selectedId, setSelectedId]             = useState('button');
  const [sidebarCollapsed, setSidebarCollapsed]   = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const selected = dataMap[selectedId];

  return (
    <div className="flex min-h-screen bg-surface-base font-sans antialiased">
      <Sidebar
        groups={NAV_GROUPS}
        selectedId={selectedId}
        onSelect={setSelectedId}
        collapsed={sidebarCollapsed}
        mobileOpen={mobileSidebarOpen}
        onMobileClose={() => setMobileSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <TopBar
          title={selected.title}
          subtitle={`UI Showcase › ${selected.category}`}
          sidebarCollapsed={sidebarCollapsed}
          onSidebarToggle={() => setSidebarCollapsed((c) => !c)}
          onMobileMenuOpen={() => setMobileSidebarOpen(true)}
        />

        <main className="flex-1 overflow-auto p-6">
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-1">
              <h2 className="text-2xl font-bold text-text-primary leading-tight">
                {selected.title}
              </h2>
              <span
                className={cn(
                  'inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium',
                  categoryStyles[selected.category]
                )}
              >
                {selected.category}
              </span>
            </div>
            <p className="text-sm text-text-secondary max-w-2xl">{selected.description}</p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
            {selected.variants.map((variant) => (
              <div key={variant.title} className={variant.layout === 'stack' ? 'xl:col-span-2' : ''}>
                <VariantBlock variant={variant} />
              </div>
            ))}
          </div>

          <div className="mt-4">
            <SourceBlock filePath={selected.filePath} sourceCode={selected.sourceCode} />
          </div>
        </main>
      </div>
    </div>
  );
}
