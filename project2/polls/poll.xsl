<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" >
<xsl:output method="html" version="1.0" indent="yes" doctype-system="about:legacy-compact"/>
    <xsl:template match="/">
        <form class="poll">

            <xsl:attribute name="name"><xsl:value-of select="poll/@name" /></xsl:attribute>
            <xsl:for-each select="poll/page">
                <div class="poll_page">
                    <header class="poll_question">
                        <p>
                            <xsl:value-of select="question" />
                        </p>
                    </header>
                    <div class="poll_answer">
                        <xsl:for-each select="multiple_choice">
                            <xsl:for-each select="option">
                                <div>
                                    <input type="checkbox" class="poll_checkbox">
                                        <xsl:attribute name="value"><xsl:value-of select="@value" /></xsl:attribute>
                                        <xsl:attribute name="name"><xsl:value-of select="@name" /></xsl:attribute>
                                    </input>
                                    <label><xsl:value-of select="current()" /></label>
                                </div>
                            </xsl:for-each>
                        </xsl:for-each>
                        <xsl:for-each select="single_choice">
                            <xsl:for-each select="option">
                                <div>
                                    <input type="radio" class="poll_radiobox">
                                        <xsl:attribute name="value"><xsl:value-of select="@value" /></xsl:attribute>
                                        <xsl:attribute name="name"><xsl:value-of select="@name" /></xsl:attribute>
                                    </input>
                                    <label><xsl:value-of select="current()" /></label>
                                </div>
                            </xsl:for-each>
                        </xsl:for-each>
                        <xsl:for-each select="text_inputs">
                            <xsl:for-each select="input">
                                <label><xsl:value-of select="current()" /></label>
                                <input type="text" class="poll_text_input">
                                    <xsl:attribute name="size"><xsl:value-of select="@size" /></xsl:attribute>
                                    <xsl:attribute name="name"><xsl:value-of select="@name" /></xsl:attribute>
                                </input>
                            </xsl:for-each>
                        </xsl:for-each>
                    </div>
                </div>
            </xsl:for-each>
        </form>
    </xsl:template>
</xsl:stylesheet>
