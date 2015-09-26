(function($){

	$.PaginationCalculator = function(maxentries, opts) {
		this.maxentries = maxentries;
		this.opts = opts;
	}
	
	$.extend($.PaginationCalculator.prototype, {
	
		numPages:function() {
			return Math.ceil(this.maxentries/this.opts.items_per_page);
		},
		
		getInterval:function(current_page)  {
			var ne_half = Math.ceil(this.opts.num_display_entries/2); 
			var np = this.numPages();
			var upper_limit = np - this.opts.num_display_entries;
			var start = current_page > ne_half ? Math.max( Math.min(current_page - ne_half, upper_limit), 0 ) : 0;
			var end = current_page > ne_half?Math.min(current_page+ne_half, np):Math.min(this.opts.num_display_entries, np);
			return {start:start, end:end};
		}
	});
	
	$.PaginationRenderers = {}
	
	$.PaginationRenderers.defaultRenderer = function(maxentries, opts) {
		this.maxentries = maxentries;
		this.opts = opts;
		this.pc = new $.PaginationCalculator(maxentries, opts);
	}
	$.extend($.PaginationRenderers.defaultRenderer.prototype, {
		createLink:function(page_id, current_page, appendopts){	
			var lnk, np = this.pc.numPages();
			page_id = page_id<0?0:(page_id<np?page_id:np-1); 
			appendopts = $.extend({text:page_id+1, classes:""}, appendopts||{});
			if(page_id == current_page){
				lnk = $("<span class='current'>" + appendopts.text + "</span>");
			}
			else
			{
				lnk = $("<a>" + appendopts.text + "</a>")
					.attr('href', this.opts.link_to.replace(/__id__/,page_id));
			}
			if(appendopts.classes){ lnk.addClass(appendopts.classes); }
			lnk.data('page_id', page_id);
			return lnk;
		},
		// Generate a range of numeric links 
		appendRange:function(container, current_page, start, end) { 
			var i;
			for(i=start; i<end; i++) {
				this.createLink(i, current_page).appendTo(container);
			}
		},
		getLinks:function(current_page,eventHandler) {
			var begin, end,
				interval = this.pc.getInterval(current_page),
				np = this.pc.numPages(),
			    fragment = $("<div class='pagination'></div>");

			// Generate "Previous"-Link
			fragment.append(this.createLink(0,current_page, {text:this.opts.shouye, classes:"shouye"}));
			if(this.opts.prev_text && (current_page > 0 || this.opts.prev_show_always)){
				fragment.append(this.createLink(current_page-1, current_page, {text:this.opts.prev_text, classes:"prev"}));
			}

			// Generate starting points
			if (interval.start > 0 && this.opts.num_edge_entries > 0)
			{
				end = Math.min(this.opts.num_edge_entries, interval.start);
				this.appendRange(fragment, current_page, 0, end);
				if(this.opts.num_edge_entries < interval.start && this.opts.ellipse_text)
				{
					jQuery("<span>"+this.opts.ellipse_text+"</span>").appendTo(fragment);
				}
			}
			// Generate interval links
			this.appendRange(fragment, current_page, interval.start, interval.end);
			// Generate ending points
			if (interval.end < np && this.opts.num_edge_entries > 0)
			{
				if(np-this.opts.num_edge_entries > interval.end && this.opts.ellipse_text)
				{
					jQuery("<span>"+this.opts.ellipse_text+"</span>").appendTo(fragment);
				}
				begin = Math.max(np-this.opts.num_edge_entries, interval.end);
				this.appendRange(fragment, current_page, begin, np);
				
			}
			//next
			if(this.opts.next_text && (current_page < np-1 || this.opts.next_show_always)){
				fragment.append(this.createLink(current_page+1, current_page, {text:this.opts.next_text, classes:"next"}));
			}
			fragment.append(this.createLink(this.maxentries,current_page, {text:this.opts.moye, classes:"moye"}));
			fragment.append("<em class='totalrecord'>共<em>"+this.maxentries+"</em>条记录</em>到第<input type='text' />页<button id='sure' type='button'>确定</button>");
			$('a',fragment).click(eventHandler);
			return fragment;
		}
	});
	
	// Extend jQuery
	$.fn.pagination = function(maxentries,opts){
		
    // Initialize options with default values
	opts = jQuery.extend({
		items_per_page:5,   //设置一页有多少条数据
		num_display_entries:5,  //显示页码的个数
		current_page:0,  //当前页    
		num_edge_entries:0,
		link_to:"javascript:void(0)",
		prev_text:"<<上一页",
		next_text:"下一页>>",
		shouye:"首页",
		moye:"末页",
		ellipse_text:"...",
		prev_show_always:true,
		next_show_always:true,
		renderer:"defaultRenderer",
		callback:function(){return false;}
	},opts||{});
	var containers = this,
		renderer, links, current_page;
		/**
		 * This is the event handling function for the pagination links. 
		 * @param {int} page_id The new page number
		 */
		function pageSelected(evt){
			var links, current_page = $(evt.target).data('page_id');
			containers.data('current_page', current_page);
			links = renderer.getLinks(current_page, pageSelected);
			containers.empty();
			links.appendTo(containers);
			var continuePropagation = opts.callback(current_page, containers);
			if (!continuePropagation) {
				if (evt.stopPropagation) {
					evt.stopPropagation();
				}
				else {
					evt.cancelBubble = true;
				}
			}
			return continuePropagation;
		}
		
		current_page = opts.current_page;
		containers.data('current_page', current_page);
		// Create a sane value for maxentries and items_per_page
		maxentries = (!maxentries || maxentries < 0)?1:maxentries;
		opts.items_per_page = (!opts.items_per_page || opts.items_per_page < 0)?1:opts.items_per_page;
		
		if(!$.PaginationRenderers[opts.renderer])
		{
			throw new ReferenceError("Pagination renderer '" + opts.renderer + "' was not found in jQuery.PaginationRenderers object.");
		}
		renderer = new $.PaginationRenderers[opts.renderer](maxentries, opts);
		
		containers.each(function() {
		// Attach control functions to the DOM element 
		this.selectPage = function(page_id){ pageSelected(page_id);}
		this.prevPage = function(){
			var current_page = containers.data('current_page');
			if (current_page > 0) {
				pageSelected(current_page - 1);
				return true;
			}
			else {
				return false;
			}
		}
		this.nextPage = function(){
			var current_page = containers.data('current_page');
			if(current_page < numPages()-1) {
				pageSelected(current_page+1);
				return true;
			}
			else {
				return false;
			}
		}
		});
		// When all initialisation is done, draw the links
		links = renderer.getLinks(current_page, pageSelected);
		containers.empty();
		links.appendTo(containers);
		// call callback function
		//opts.callback(current_page, containers);
	
}

})(jQuery);
