<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" >
<xsl:output method="html" version="1.0" indent="yes" doctype-system="about:legacy-compact"/>

<xsl:template match="/">
    <html>
        <head>
            <title>Techniki internetowe 2021/2022</title>
            <link rel="StyleSheet" href="../../css/main.css" type="text/css"/>
        </head>

        <body>
            <div id="content">
                <xsl:for-each select="html/body/article">
                <article>
                    <header id="main_header">
                        <h1><xsl:value-of select="header/title"/></h1>
                    </header>
                    <div class="list_menu">
                        <header class="list_menu_header">
                            <h2><xsl:value-of select="list/header/title"/></h2>
                        </header>
                        <xsl:for-each select="list/element">
                        <h3><xsl:value-of select="title"/></h3>
                        <xsl:for-each select="task">
                        <a>
                            <xsl:attribute name="class">
                                <xsl:value-of select="@class"/>
                            </xsl:attribute>
                            <xsl:attribute name="href">
                                <xsl:value-of select="@link"/>
                            </xsl:attribute>
                            <h4><xsl:value-of select="."/></h4>
                        </a>
                        </xsl:for-each>
                        </xsl:for-each>
                    </div>
                </article>
                </xsl:for-each>
            </div>
        </body>
    </html>
</xsl:template>
</xsl:stylesheet>