<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" >
<xsl:output method="html" version="1.0" indent="yes" doctype-system="about:legacy-compact"/>
<xsl:param name="sortby"/>
<xsl:param name="sortby_data_type">text</xsl:param>
    <xsl:template match="/">
    	
        <html>
            <head>
                <title>Produkty w magazynie</title>
                <link rel="StyleSheet" href="../labs/lab5/products_table.css" type="text/css"/>
            </head>
            <body>
            	<p>sortby: <xsl:value-of select="$sortby_data_type"/></p>
                <table class="products">
                    <thead>
                        <tr class="header">
                            <th>Lp.</th>
                            <th>Produkt</th>
                            <th>Ilość w magazynie</th>
                            <th>Cena jednostkowa</th>
                        </tr>
                    </thead>
                    <tbody>
                        <xsl:for-each select="warehouse/product_group">
                            <tr class="product_group_header">
                                <th colspan="4"><xsl:value-of select="name"/></th>
                            </tr>
                            <xsl:for-each select="product">
            			<xsl:sort select="*[name()=$sortby]" data-type="{$sortby_data_type}"/>
                                <tr>
                                    <td><xsl:value-of select="position()"/></td>
                                    <td><xsl:value-of select="name"/></td>
                                    <td><xsl:value-of select="quantity"/></td>
                                    <td><xsl:value-of select="price"/></td>
                                </tr>
                            </xsl:for-each>
                        </xsl:for-each>
                    </tbody>
                </table>
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>
