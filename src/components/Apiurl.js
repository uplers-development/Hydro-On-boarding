/*********************************Staging Server*********************************************/
export const base_url='http://staging.project-progress.net/projects/hydro/';
export const site_url='http://staging.project-progress.net';
let target_id=localStorage.getItem("user-type")!==null? JSON.parse(localStorage.getItem("user-type")).uid:'';
console.log(target_id);
export default {
    Loginpagecontent:{
        url:base_url+'json-api/login.json',
        method:'GET'
    },
    Loginaction: {
    	 url: base_url+'user/login?_format=json',
         method: 'POST'
    },
    Welcomeblockmain:{
         url:base_url+'node/2?_format=json',
         method:'GET'
    },
    WelcomeThreeblock:{
         url:base_url+`/jsonapi/welcome_block?_format=json`,
         method:'GET'
    },
    DashboardRightSide:{
         url:base_url+`/jsonapi/sidebar?_format=json`,
         method:'GET'
    },
    DashboardLeftSideClient:{
         url:base_url+`/jsonapi/menu_list/`,
         method:'GET'
    },
    /*DashboardLeftSideRepuser:{
         url:base_url+`/jsonapi/menu_list/main-navigation-rep?_format=json`,
         method:'GET'
    },
    DashboardLeftSideAdmin:{
         url:base_url+`/jsonapi/menu_list/main-navigation-admin?_format=json`,
         method:'GET'
    },*/
    Newsfeeds:{
        url:base_url+"/jsonapi/news_feed/?_format=json",
        method:"GET"
    },
    Newsfeeds_Pagination:{
        url:base_url+"/jsonapi/news_feed/?_format=json",
        method:'GET'
    },
    Newsfeeds_recentviews:{
        url:base_url+"/jsonapi/recently_viewed?_format=json",
        method:'GET'
    },
    ProductListEnduser:{
        url:base_url+"/jsonapi/product_list?_format=json",
        method:"GET"
    }, 
    ProductCategoryId:{
        url:base_url+"/jsonapi/taxonomy_list/applications?_format=json",
        method:"GET"
    },
    FilterProductCategoryById:{
        url:base_url+"/jsonapi/product_list?_format=json",
        method:"GET"
    },
    //for Sorting A-z after the filter pass field_product_category_target_id=6
    SortProductByNewDate:{
        url:base_url+"/jsonapi/product_list?_format=json&sort_by=field_purchase_date_value&sort_order=ASC",
        method:"GET"
    },
    SortProductByOldDate:{
        url:base_url+"/jsonapi/product_list?_format=json&sort_by=field_purchase_date_value&sort_order=DESC",
        method:"GET"
    },
    SortProductByA_Z:{
        url:base_url+"/jsonapi/product_list?_format=json&sort_by=title&sort_order=ASC",
        method:"GET"
    },
    GetProductTitle:{
        url:base_url+"/jsonapi/product_list_title/?_format=json",
        method:"GET"
    }, 
    ProductListTitleSearch:{
        url:base_url+"/jsonapi/product_list?_format=json",
        method:"GET"
    },

    /**************************Resources API call******************************************/
    GetResourcesList:{
        url:base_url+'/jsonapi/resources_listing/?_format=json',
        method:'GET'
    },
    GetResourceProductbaseFilter:{
        url:base_url+'jsonapi/resources_listing/',
        method:'GET'
    },
    GetResourceTypeTitleId:{
        url:base_url+'/jsonapi/taxonomy_list/resource_type?_format=json',
        method:'GET'
    },
    FilterByResourceId:{
        url:base_url+"/jsonapi/resources_listing/",
        method:'GET'
    },
    SortResources:{
        url:base_url+"/jsonapi/resources_listing/?_format=json",
        method:'GET'
    },
    ListResourcesforSearch:{
        url:base_url+"/jsonapi/resources_title?_format=json",
        method:'GET'
    },
    /****************************Resources API call ends************************************/
    /****************************Contract API call starts**********************************/

    GetContractForEndusers:{
        url:base_url+'/jsonapi/contract_list?_format=json',
        method:'GET'
    }, 
    GetContractType:{
        url:base_url+'/jsonapi/taxonomy_list/contract_type?_format=json',
        method:'GET'
    }, 
    ContractTypeBaseFilter:{
        url:base_url+'/jsonapi/contract_list?_format=json',
        method:'GET'
    }, 
    ContractSortByFilter:{
        url:base_url+'/jsonapi/contract_list?_format=json',
        method:'GET'
    }, 
    ContractSortByDate:{
        url:base_url+'/jsonapi/contract_list?_format=json',
        method:'GET'
    }, 
    ContractSortA_Z:{
        url:base_url+'/jsonapi/contract_list?_format=json',
        method:'GET'
    }, 


    GetProfile: {
    	 url: base_url+'user/user_id?_format=json',
         method: 'GET'
    },Updateprofile: {
         url: base_url+'user/2?_format=json',
         method: 'PATCH'
    },Leftsidebar_client: {
    	 url: base_url+'/jsonapi/menu_list/main?_format=json',
         method: 'GET'
    },Leftsidebar_enduser: {
    	 url: base_url+'entity/menu/main/tree',
         method: 'GET'
    },Leftsidebar_repuser: {
    	 url: base_url+'entity/menu/main-navigation-rep/tree',
         method: 'GET'
    },Leftsidebar_adminuser: {
    	 url: base_url+'entity/menu/main-navigation-admin/tree',
         method: 'GET'
    },Newsfeeds: {
    	 url: base_url+'jsonapi/news_feed/?_format=json',
         method: 'POGETST'
    }
}