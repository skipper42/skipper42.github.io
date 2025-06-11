function FindProxyForURL(url, host) {

        //------------------------Customer Section------------------------
        //Add your internal domains within quotations marks like "wwwin.acme.com"
        //after the right parenthesis below. Please remove the two examples
        //below and add your own internal domains.

        var dont_proxy_customer_list = ["apde.eu.amp.cisco.com","*.apde.eu.amp.cisco.com","api.eu.amp.cisco.com","*.api.eu.amp.cisco.com","api.eu.amp.sourcefire.com","*.api.eu.amp.sourcefire.com","bol.com","*.bol.com","clam-defs.eu.amp.cisco.com","*.clam-defs.eu.amp.cisco.com","cloud-android-asn.eu.amp.cisco.com","*.cloud-android-asn.eu.amp.cisco.com","cloud-ec-asn.eu.amp.cisco.com","*.cloud-ec-asn.eu.amp.cisco.com","cloud-ec-est.eu.amp.cisco.com","*.cloud-ec-est.eu.amp.cisco.com","cloud-ios-asn.eu.amp.cisco.com","*.cloud-ios-asn.eu.amp.cisco.com","cloud-ios-est.eu.amp.cisco.com","*.cloud-ios-est.eu.amp.cisco.com","cloud-pc-asn.eu.amp.cisco.com","*.cloud-pc-asn.eu.amp.cisco.com","cloud-pc-est.eu.amp.cisco.com","*.cloud-pc-est.eu.amp.cisco.com","commercial.ocsp.identrust.com","*.commercial.ocsp.identrust.com","console.eu.amp.cisco.com","*.console.eu.amp.cisco.com","custom-signatures.eu.amp.cisco.com","*.custom-signatures.eu.amp.cisco.com","endpoints.eu.amp.cisco.com","*.endpoints.eu.amp.cisco.com","enrolment.eu.amp.cisco.com","*.enrolment.eu.amp.cisco.com","export.eu.amp.cisco.com","*.export.eu.amp.cisco.com","export.eu.amp.sourcefire.com","*.export.eu.amp.sourcefire.com","intake.eu.amp.cisco.com","*.intake.eu.amp.cisco.com","ioc.eu.amp.cisco.com","*.ioc.eu.amp.cisco.com","mgmt.eu.amp.cisco.com","*.mgmt.eu.amp.cisco.com","ncp.orbital.amp.cisco.com","*.ncp.orbital.amp.cisco.com","nimbus.bitdefender.net","*.nimbus.bitdefender.net","orbital.amp.cisco.com","*.orbital.amp.cisco.com","packages-v2.amp.sourcefire.com","*.packages-v2.amp.sourcefire.com","pc-packages.amp.cisco.com","*.pc-packages.amp.cisco.com","policy.eu.amp.cisco.com","*.policy.eu.amp.cisco.com","rff.eu.amp.cisco.com","*.rff.eu.amp.cisco.com","sso-866389ab.sso.duosecurity.com","*.sso-866389ab.sso.duosecurity.com","submit.amp.cisco.com","*.submit.amp.cisco.com","support-sessions.amp.cisco.com","*.support-sessions.amp.cisco.com","tetra-defs.eu.amp.cisco.com","*.tetra-defs.eu.amp.cisco.com","thousandeyes.com","*.thousandeyes.com","update.orbital.amp.cisco.com","*.update.orbital.amp.cisco.com","upgrades.eu.amp.cisco.com","*.upgrades.eu.amp.cisco.com","validation.identrust.com","*.validation.identrust.com"];

        //Warning to Administrators: Touching any section after this point might
        //affect your users browsing experience and lead to considerable number
        //of issues and loading your customer support.
        //---------------------End Customer Section-----------------------

        for(var iter = 0; iter < dont_proxy_customer_list.length; ++iter) {
            if(shExpMatch(host, dont_proxy_customer_list[iter])) {
                return "DIRECT";
            }
        }

        var dont_proxy_infra = ["ocsp.int-x3.letsencrypt.org","isrg.trustid.ocsp.identrust.com","*.opendns.com","*.umbrella.com","*.okta.com","*.oktacdn.com","*.oktapreview.com","*.pingidentity.com","*.microsoftonline-p.com","*.ultipro.com","*.ultiproworkplace.com","*.ultimatesoftware.com","*.ultipro.ca","*.ultiprotime.com","*.ultipro-time-management.com","*.watson.events.data.microsoft.com","data.eb.thousandeyes.com","data.eb.eu1.thousandeyes.com","c1.eb.thousandeyes.com","c1.eb.eu1.thousandeyes.com","downloads.thousandeyes.com"];

        for(var iter = 0; iter < dont_proxy_infra.length; ++iter) {
            if(
                shExpMatch(host, dont_proxy_infra[iter]) &&
                !shExpMatch(host, "*gateway.id.swg.umbrella.com") &&
                !shExpMatch(host, "policy-debug.opendns.com") &&
                !shExpMatch(host, "block.opendns.com")
            ) {
                return "DIRECT";
            }
        }

        
        var urlWithPortRegEx = /(.+):(\d+)($|([\/](.*))+)/;
        var urlPort80RegEx = /(.+):80($|([\/](.*))+)/;
        var urlPort443RegEx = /(.+):443($|([\/](.*))+)/;
        if (urlWithPortRegEx.test(url) && !urlPort80RegEx.test(url) && !urlPort443RegEx.test(url)) {
            return "DIRECT";
        }

        if (isPlainHostName(host)) {
            return "DIRECT";
        }

        var privateIP = /^(0|10|127|192.168|172.1[6789]|172.2[0-9]|172.3[01]|169.254|192.88.99).[0-9.]+$/;
        if (privateIP.test(host)) {
            return "DIRECT";
        }

        {
        return "PROXY 1.2.3.4:443; DIRECT";
        }
}