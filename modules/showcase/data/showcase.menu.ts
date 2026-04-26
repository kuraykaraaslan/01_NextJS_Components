import { NavGroup } from "../ui/Sidebar";

const NAV_GROUPS: NavGroup[] = [
  {
    label: 'Atoms',
    items: [
      { id: 'button',       title: 'Button',            category: 'Atom', abbr: 'Bt' },
      { id: 'button-group', title: 'ButtonGroup',       category: 'Molecule', abbr: 'BG' },
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
      { id: 'slider',              title: 'Slider',             category: 'Molecule', abbr: 'Sl' },
    ],
  },
  {
    label: 'App Concepts',
    sectionStart: 'App Concepts',
    items: [
      { id: 'top-navbar',        title: 'TopNavbar',       category: 'App', abbr: 'TN' },
      { id: 'nav-drawer',        title: 'NavDrawer',       category: 'App', abbr: 'ND' },
      { id: 'dashboard-shell',   title: 'DashboardShell',  category: 'App', abbr: 'DS' },
    ],
  },
];

export default NAV_GROUPS;