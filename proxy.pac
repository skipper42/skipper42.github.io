function FindProxyForURL(url, host) {

        //------------------------Customer Section------------------------
        //Add your internal domains within quotations marks like "wwwin.acme.com"
        //after the right parenthesis below. Please remove the two examples
        //below and add your own internal domains.

        var dont_proxy_customer_list = ["10.168.192.in-addr.arpa","*.10.168.192.in-addr.arpa","203.168.192.in-addr.arpa","*.203.168.192.in-addr.arpa","ext.mealabcloud.com","*.ext.mealabcloud.com","mealabcloud.com","*.mealabcloud.com","*.duosecurity.com","*.manage.microsoft.com","*.okta.com","*.oktacdn.com","*.opendns.com","*.pingidentity.com","*.sse.com","*.umbrella.com","isrg.trustid.ocsp.identrust.com","*.isrg.trustid.ocsp.identrust.com","ocsp.int-x3.letsencrypt.org","*.ocsp.int-x3.letsencrypt.org","secure.aadcdn.microsoftonline-p.com","*.secure.aadcdn.microsoftonline-p.com"];

        //Warning to Administrators: Touching any section after this point might
        //affect your users browsing experience and lead to considerable number
        //of issues and loading your customer support.
        //---------------------End Customer Section-----------------------

        for(var iter = 0; iter < dont_proxy_customer_list.length; ++iter) {
            if(shExpMatch(host, dont_proxy_customer_list[iter])) {
                return "DIRECT";
            }
        }

        var dont_proxy_infra = ["ocsp.int-x3.letsencrypt.org","isrg.trustid.ocsp.identrust.com","*.opendns.com","*.umbrella.com","*.okta.com","*.oktacdn.com","*.oktapreview.com","*.pingidentity.com","*.microsoftonline-p.com","*.ultipro.com","*.ultiproworkplace.com","*.ultimatesoftware.com","*.ultipro.ca","*.ultiprotime.com","*.ultipro-time-management.com","data.eb.thousandeyes.com","data.eb.eu1.thousandeyes.com","c1.eb.thousandeyes.com","c1.eb.eu1.thousandeyes.com","downloads.thousandeyes.com"];

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

        var protocolIndex = url.indexOf("://");
        var protocol = url.substring(0, protocolIndex);

        switch (protocol) {
            case "https":
            case "wss":
                return "PROXY swg-url-proxy-https-sse.sigproxy.qq.opendns.com:443";
            case "http":
            case "ws":
                return "PROXY swg-url-proxy-https-sse.sigproxy.qq.opendns.com:80";
            default:
                return "DIRECT";
        }
    }