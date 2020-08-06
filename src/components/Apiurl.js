/*********************************Staging Server*********************************************/
export const base_url=process.env.NODE_ENV==='production' && window.location.origin!=="http://hydro-on-boarding.dev.project-progress.net" ? window.location.origin : '//staging.project-progress.net/projects/hydro';
export const site_url=process.env.NODE_ENV==='production' && window.location.origin!=="http://hydro-on-boarding.dev.project-progress.net" ? window.location.origin :'//staging.project-progress.net';
const target_id=localStorage.getItem("user-type")!==null? JSON.parse(localStorage.getItem("user-type")).uid:'';


export const Client={
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
    Newsfeeds:{
        url:base_url+"/jsonapi/news_feed/?_format=json",
        method:"GET"
    },
    NewsfeedsNotification:{
        url:base_url+"/json-api/newsfeeds.json",
        method:"POST"
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
    SortProduct:{
        url:base_url+"/jsonapi/product_list?_format=json",
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
    GetRepContactDetails:{
        url:base_url+"/json-api/repdetails.json",
        method:"GET"
    },
    SendRepContactQuery:{
        url:base_url+`/json-api/repmail.json`,
        method:"POST"
    },
    tirggerResourcedf:{
        url:base_url+`/json-api/recenlty_read.json`,
        method:"POST"
    }
}

export const Repclient={
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
    },
    Repclientdatatable:{
        url:base_url+"/jsonapi/clients?_format=json",
        method:"GET"
    },
    Repclientdetailssubmission:{
        url:base_url+"/entity/user?_format=json",
        method:"POST"
    },
    Repclientdetailssubmissionnotification:{
        url:base_url+"/json-api/usernotification.json",
        method:"POST"
    },
    Repclientdetailssubmissionproductlist:{
        url:base_url+"/node?_format=json",
        method:"POST"
    },
    RepAnnouncementclienttable:{
        url:base_url+"/jsonapi/announcement_clients?_format=json",
        method:"GET"
    },
    RepAnnouncementclientnewsfeeds:{
        url:base_url+"/json-api/news_feed_type.json",
        method:"GET"
    },
    RepAddcontractuploadfile:{
        url:base_url+"/file/upload/node/product_purchase/field_purchase_doument?_format=json",
    }, 
    RepAddproductuploadimage:{
        url:base_url+"/file/upload/node/product_purchase/field_purchase_doument?_format=json",
    }, 
    RepAnnouncementaddimage:{
        url:base_url+"/file/upload/node/article/field_image?_format=json",
    },
    RepAddproductsearch:{
        url:base_url+"/jsonapi/add_products?_format=json",
        method:"GET"
    },
    RepAddSingleproductdetails:{
        url:base_url+"/jsonapi/add_products?_format=json",
        method:"GET"
    }
    ,RepAnnouncementproductlist:{
        url:base_url+"/jsonapi/taxonomy_list/applications?_format=json",
        method:"GET"
    },
    RepAnnouncementfilterclientlocation:{
        url:base_url+"/jsonapi/announcement_clients?_format=json",
        method:"GET"
    },
    RepAnnouncementlocationlist:{
        url:base_url+"/json/company_list?_format=json",
        method:"GET"
    }, 
    RepBulkdelete:{
        url:base_url+"/json-api/bulk_delete.json?_format=json",
        method:"POST"
    },
    Repclientsingledelete:{
        url:base_url+"/user/",
        method:"PATCH"
    },
    Repclientcontractdetails:{
        url:base_url+"/jsonapi/clients_contract_details/",
        method:"GET"
    }, 
    Repclientproductdetails:{
        url:base_url+"/jsonapi/client_products_details/",
        method:"GET"
    }

}

export const Admin={
    menulisting:{
        url:base_url+'/json-api/menu_list.json',
        method:'POST'
    },
    adminprofileinfo:{
        url:base_url+`/user/`,
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
    },
    adminproductdropdown:{
        url:base_url+`/jsonapi/taxonomy_list/applications?_format=json`,
        method:"GET",
    },
    adminproducttabledata:{
        url:base_url+`/jsonapi/admin_products?_format=json`,
        method:"GET",
    },
    adminproductdelete:{
        url:base_url+`/node/`,
        method:"DELETE",
    },admindraftproduct:{
        url:base_url+`/node/`,
        method:"PATCH",
    },
    adminaddproduct:{
        url:base_url+`/node?_format=json`,
        method:"POST",
    },
    adminproductAdddocument:{
        url:base_url+`/file/upload/node/products/field_product_document?_format=json`,
    },
    adminproductAddimage:{
        url:base_url+`/file/upload/node/products/field_product_image?_format=json`,
    },
    adminviewproduct:{
        url:base_url+`/json-api/node_view.json`,
        method:'POST'
    }, 
    adminupdateproduct:{
        url:base_url+`/node/`,
        method:'PATCH'
    }, 
    adminreptablelisting:{
        url:base_url+`/jsonapi/admin_reps?_format=json`,
        method:"GET"
    },
    adminrepdeletesingle:{
        url:base_url+`/user/`,
        method:"PATCH"
    },
    adminaddrepclient:{
        url:base_url+`/entity/user/`,
        method:"POST",
    }, 
    adminaddupdaterepclient:{
        url:base_url+`/user/`,
        method:"PATCH",
    },
    adminviewrepclient:{
        url:base_url+`/user/`,
        method:"GET",
    }
}

export default {
    Loginpagecontent:{
        url:base_url+'/json-api/login.json',
        method:'GET'
    },
    Loginaction: {
         url: base_url+'/user/login?_format=json',
         method: 'POST'
    },
    menulisting:{
        url:base_url+"/json-api/menu_list.json",
        method:"POST"
    },
        
    GetProfile: {
         url: base_url+`/user/`,
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
    LogoutCall:{
        url:base_url+`/json-api/user_logout.json`,
        method:"POST"
    }

}