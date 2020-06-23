/*********************************Staging Server*********************************************/

export default {
    Loginaction: {
    	 url: 'http://staging.project-progress.net/projects/hydro/user/login',
         method: 'POST'
    },Profile: {
    	 url: 'http://staging.project-progress.net/projects/hydro/user',
         method: 'GET'
    },Sidebar: {
    	 url: 'http://staging.project-progress.net/projects/hydro/block/',
         method: 'GET'
    },Leftsidebar_enduser: {
    	 url: 'http://staging.project-progress.net/projects/hydro/entity/menu/main/tree',
         method: 'GET'
    },Leftsidebar_repuser: {
    	 url: 'http://staging.project-progress.net/projects/hydro/entity/menu/main-navigation-rep/tree',
         method: 'GET'
    },Leftsidebar_adminuser: {
    	 url: 'http://staging.project-progress.net/projects/hydro/entity/menu/main-navigation-admin/tree',
         method: 'GET'
    },Newsfeeds: {
    	 url: 'http://staging.project-progress.net/projects/hydro/jsonapi/news_feed/?_format=json',
         method: 'POGETST'
    }
}