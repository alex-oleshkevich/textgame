{% do %}
set local_variable = 1
{% enddo %}

As of v2.0, Tailwind CSS depends on PostCSS 8. Because PostCSS 8 is only a few months old, many other tools in the ecosystem 
haven't updated yet, which means you might see an error like this in your terminal after installing 
Tailwind and trying to compile your CSS:

The compatibility build is identical to the main build in every way, so you aren't missing out on any features or 
anything like that.

Once the rest of your tools have added support for PostCSS 8, you can move off of the compatibility build by re-installing 
Tailwind and its peer-dependencies using the latest tag.

[[ Go to next page | c1p3 | set local_variable = 2 ]]
[[ Go to prev page | c1p1 | incr counter ]]
