var tocBuilder = {
  tocPath: "/toc.json",
  targetElement: null,
  targetSection: "",
  relativeToPath: "",

  installToc: function(target) {
    this.targetElement = target;
    this.targetSection = this.targetElement.data("section");

    if (this.targetSection.length == 0) {
      this.hideToc();
      return;
    }

    var parent = this;
    $.ajax(this.relativeToPath + this.tocPath, {
      success: function(data, status, xhr) {
        parent.loadTocFromData(data);
        parent.showToc();
      }
    });
  },
  hideToc: function () {
    this.targetElement.hide();
  },
  showToc: function () {
    this.targetElement.show();
  },
  loadTocFromData: function(data) {
    var toc = [];
    var parent = this;
    $.each(data.toc, function(i, item) {
      if (item.section == parent.targetSection) {
        parent.addListToToc(item.children, toc);
      }
    });
    this.targetElement.html(toc.join(''));
  },
  addListToToc: function(items, toc) {

    toc.push('<ul>');
    var parent = this;
    $.each(items, function(i, item) {
      parent.addTocItem(item, toc);
    });
    toc.push('</ul>');
  },
  addTocItem: function(item, toc) {
    if (item.url) {
      toc.push('<li><a href="' + this.relativeToPath + item.url + '">' + item.title + '</a></li>');
    } else {
      toc.push('<li>' + item.title + '</li>');
    }

    if (item.children && item.children.length > 0) {
      this.addListToToc(item.children, toc);
    }
  }
};

$(document).ready(function() {
  // Add the table of contents to the page
  tocBuilder.installToc($("#tocbar"));
});
