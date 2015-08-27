var library = {};

library.json = {
	replacer: function(match, pIndent, pKey, pVal, pEnd) {
		var key = '<span class=json-key>';
		var val = '<span class=json-value>';
		var str = '<span class=json-string>';
		var r = pIndent || '';
		if (pKey)
			r = r + key + pKey.replace(/[": ]/g, '') + '</span>: ';
		if (pVal)
			r = r + (pVal[0] == '"' ? str : val) + pVal + '</span>';
		return r + (pEnd || '');
	},
	prettyPrint: function(obj) {
		var jsonLine = /^( *)("[\w]+": )?("[^"]*"|[\w.+-]*)?([,[{])?$/mg;

		console.log(jsonLine);

		return JSON.stringify(obj, null, 3)
			.replace(/&/g, '&amp;').replace(/\\"/g, '&quot;')
			.replace(/</g, '&lt;').replace(/>/g, '&gt;')
			.replace(jsonLine, library.json.replacer);
		}
};

var account = {"ok":true,"probeResults":{"dataSource":{"ok":true,"additionalInformation":{"url":"jdbc:jtds:sqlserver://vip-qa-sql-q4.qa.vmcommerce.intra:1433/WalmartProd"}},"dataSource_cep":{"ok":true,"additionalInformation":{"url":"jdbc:jtds:sqlserver://vip-qa-sql-q4.qa.vmcommerce.intra:1433/Cep"}},"Search":{"ok":true,"additionalInformation":{"lastExecutionDate":"2015-07-15T14:26:20.301+0000","executionTime":7,"timeout":60000,"endpoint":"http://ws-search-cache.qa.vmcommerce.intra/ws/marketplace/select?facet=true&fq=isVisible:true"}},"KeywordPages":{"ok":true,"additionalInformation":{"Page":{"lastExecutionDate":"2015-07-15T14:26:00.597+0000","status":true,"executionTime":13,"timeout":1000,"endpoint":"http://kp.qa.vmcommerce.intra/api/page/bateria"},"Crosslink":{"lastExecutionDate":"2015-07-15T14:26:00.610+0000","status":true,"executionTime":10,"timeout":1000,"endpoint":"http://kp.qa.vmcommerce.intra/api/product/2033343"}}},"Payment":{"ok":true,"additionalInformation":{"lastExecutionDate":"2015-07-15T14:26:20.292+0000","executionTime":9,"endpointPayment":"http://napsao-nix-qa-krabs-pay-methods-1.qa.vmcommerce.intra/v1/paymentMethodsAvailable/sadsadsa","timeout":3000}},"RabbitMQ":{"ok":true,"additionalInformation":{"host-2":{"lastExecutionDate":"2015-07-15T14:26:15.064+0000","executionTime":19,"status":true,"endpoint":"napsao-qa-nix-fend-ng-rabbitmq-2.qa.vmcommerce.intra"},"host-1":{"lastExecutionDate":"2015-07-15T14:26:15.045+0000","executionTime":23,"status":true,"endpoint":"napsao-qa-nix-fend-ng-rabbitmq-1.qa.vmcommerce.intra"},"timeout":1000}},"slaveRedisConnectionFactory":{"ok":true,"additionalInformation":{"port":"6379","host":"eth0"}},"slaveSecondaryRedisConnectionFactory":{"ok":true,"additionalInformation":{"port":"6380","host":"eth0"}},"masterRedisConnectionFactory":{"ok":true,"additionalInformation":{"port":"6379","host":"eth0"}},"InMemoryState":{"ok":true,"additionalInformation":{"lastExecutionDate":"2015-07-15T14:23:08.845+0000"}},"Catalog":{"ok":true,"additionalInformation":{"SingleSku":{"lastExecutionDate":"2015-07-15T14:26:20.256+0000","executionTime":40,"status":true,"endpoint":"http://vip-cat-serv.qa.vmcommerce.intra/ws/skus/230.json?display=sku_offer&display=offer_additional"},"TagProducts":{"lastExecutionDate":"2015-07-15T14:26:20.292+0000","executionTime":19,"status":true,"endpoint":"http://vip-cat-serv.qa.vmcommerce.intra/ws/tags/products.json?tag=15857&display=product_cached"},"Skus":{"lastExecutionDate":"2015-07-15T14:26:20.216+0000","executionTime":216,"status":true,"endpoint":"http://vip-cat-serv.qa.vmcommerce.intra/ws/skus.json?display=sku_offer&display=offer_additional&page=1&page_size=1"},"ProductTags":{"lastExecutionDate":"2015-07-15T14:26:20.273+0000","executionTime":17,"status":true,"endpoint":"http://vip-cat-serv.qa.vmcommerce.intra/ws/products/2000263.json?displays=product_tags"},"timeout":3000}},"Discount":{"ok":true,"additionalInformation":{"lastExecutionDate":"2015-07-15T14:26:15.000+0000","executionTime":21,"timeout":9000,"endpoint":"http://vip-darpa-deal-core.qa.vmcommerce.intra/rs/hc/isalive"}},"Ceph":{"ok":true,"additionalInformation":{"lastExecutionDate":"2015-07-15T14:26:00.253+0000","executionTime":5,"endpoint":"ceph.qa.vmcommerce.intra"}},"dataSource_marketplace":{"ok":true,"additionalInformation":{"url":"jdbc:jtds:sqlserver://vip-qa-sql-q4.qa.vmcommerce.intra:1433/Walmart_MktPlace"}},"masterSecondaryRedisConnectionFactory":{"ok":true,"additionalInformation":{"port":"6380","host":"eth0"}},"dataSource_portal":{"ok":true,"additionalInformation":{"url":"jdbc:jtds:sqlserver://vip-qa-sql-q4.qa.vmcommerce.intra:1433/PortalProd"}}}};

document.addEventListener("DOMContentLoaded", function() {
	$('#account').html(library.json.prettyPrint(account));
});
