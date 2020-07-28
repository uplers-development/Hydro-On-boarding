/*********************************Staging Server*********************************************/
export const base_url=process.env.NODE_ENV==='production' ? window.location.origin : '//staging.project-progress.net/projects/hydro';
export const site_url=process.env.NODE_ENV==='production' ? window.location.origin :'//staging.project-progress.net';
const target_id=localStorage.getItem("user-type")!==null? JSON.parse(localStorage.getItem("user-type")).uid:'';

export default {
    Loginpagecontent:{
        url:base_url+'/json-api/login.json',
        method:'GET'
    },
    Loginaction: {
    	 url: base_url+'/user/login?_format=json',
         method: 'POST'
    },
    Welcomeblockmain:{
         url:base_url+'/node/2?_format=json',
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
    SortProduct:{
        url:base_url+"/jsonapi/product_list?_format=json",
        method:"GET"
    },
    /*SortProductByNewDate:{
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
    },*/
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
        url:base_url+"/jsonapi/resources_listing/",
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
    GetContractProduct:{
        url:base_url+"/jsonapi/product_list?_format=json",
        method:"GET"
    },
    ContractTypeBaseFilter:{
        url:base_url+'/jsonapi/contract_list?_format=json',
        method:'GET'
    }, 
    ContractTypeProductBaseFilter:{
        url:base_url+'/jsonapi/contract_list/',
        method:'GET'
    }, 

    GetAllContractForSearch:{
        url:base_url+'/json/contract_listing?_format=json',
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

    /*************************Contract API END*******************************/
    /***********************REP Contact API Start***************************/
    GetRepContactDetails:{
        url:base_url+"/json-api/repdetails.json",
        method:"GET"
    },
    SendRepContactQuery:{
        url:`http://staging.project-progress.net/projects/hydro/json-api/repmail.json`,
        method:"POST"
    },

    GetProfile: {
    	 url: base_url+`/user/${target_id}?_format=json`,
         method: 'GET'
    },Updateprofile: {
         url: base_url+`/user/${target_id}?_format=json`,
         method: 'PATCH'
    }
    ,ProfiletimeZone: {
         url: base_url+"/json-api/timezones.json",
         method: 'GET'
    },
    UpdateprofilePic: {
         url: base_url+"/file/upload/user/user/user_picture?_format=json",
         method: 'PATCH'
    },Leftsidebar_client: {
    	 url: base_url+'/jsonapi/menu_list/main?_format=json',
         method: 'GET'
    },Leftsidebar_enduser: {
    	 url: base_url+'/entity/menu/main/tree',
         method: 'GET'
    },Leftsidebar_repuser: {
    	 url: base_url+'/jsonapi/menu_list/main-navigation-rep?_format=json',
         method: 'GET'
    },Leftsidebar_adminuser: {
    	 url: base_url+'/jsonapi/menu_list/main-navigation-admin?_format=json',
         method: 'GET'
    }, 
    LeftsidebarFooter:{
         url:base_url+`/jsonapi/user_sidebar/?_format=json`,
         method:'GET'
    },



    /******************************************REP USERS API CALLS START******************************************/

    RepDashboardRecentlyPublished:{
        url:base_url+"/jsonapi/rep_recently_publish?_format=json",
        method:"GET"
    },
    RepDashboardNewUsers:{
        url:base_url+"/jsonapi/new_users?_format=json",
        method:"GET"
    },RepDashboardOverview:{
        url:base_url+"/json-api/repglance.json",
        method:"GET"
    },RepDashboardLatestProducts:{
        url:base_url+"/jsonapi/latest_products?_format=json",
        method:"GET"
    },RepDashboardNewsFeeds:{
        url:base_url+"/jsonapi/rep_news_feed?_format=json",
        method:"GET"
    }


    /******************************************REP USERS API CALLS ENDS ******************************************/

}

export const Admin={
    menulisting:{
        url:base_url+'/json-api/menu_list.json',
        method:'POST'
    },
    adminprofileinfo:{
        url:base_url+`/user/${target_id}?_format=json`,
        method:'GET'
    },
    adminresourcedropdown:{
        url:base_url+`/jsonapi/taxonomy_list/resource_type?_format=json`,
        method:'GET'
    }, 
    adminresourcelisting:{
        url:base_url+`/jsonapi/admin_resources?_format=json`,
        method:'GET'
    },
    adminresourcedraft:{
        url:base_url+`/node/`,
        method:'PATCH'
    },
    adminresourcedelete:{
        url:base_url+`/node/`,
        method:'DELETE'
    },
    adminresourceAdd:{
        url:base_url+`/node?_format=json`,
        method:'POST'
    }, 
    adminresourceUpdate:{
        url:base_url+`/node/`,
        method:'PATCH'
    }, 
    adminviewresource:{
        url:base_url+`/json-api/node_view.json`,
        method:'POST'
    }, 
    adminresourceProducttags:{
        url:base_url+`/jsonapi/admin_products?_format=json`,
        method:'GET'
    },
    adminresourceAdddocument:{
        url:base_url+`/file/upload/node/resources/field_resources_document?_format=json`,
    },
    adminresourceAddimage:{
        url:base_url+`/file/upload/node/resources/field_resources_image?_format=json`,
    }
}