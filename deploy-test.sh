#!/bin/bash
# 
# Cleans and deploys the project to S3.
#
# Usage:
#   ./deploy.sh <ACCESS_KEY> <SECRET_KEY>

# Initialize some vars

if [ $# -eq 2 ]; then
    export AWS_ACCESS_KEY_ID="$1"
    export AWS_SECRET_ACCESS_KEY="$2"
fi

REGION="us-east-2"
BUCKET="test.crunchydata.com"
DEPLOY_DIR=".deploy"

#=== Google Tag Manager ===#
GTM_HEAD="<!-- Google Tag Manager --><script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl+ '&gtm_auth=wWrlYXS5zhuuAOrKWUDR-Q&gtm_preview=env-8&gtm_cookies_win=x';f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-NXJR9MD');</script><!-- End Google Tag Manager -->"
GTM_BODY='<!-- Google Tag Manager (noscript) --><noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NXJR9MD&gtm_auth=wWrlYXS5zhuuAOrKWUDR-Q&gtm_preview=env-8&gtm_cookies_win=x" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript><!-- End Google Tag Manager (noscript) -->'
# Escape special characters
GTM_HEAD=$(echo "$GTM_HEAD" | sed 's/[^a-zA-Z0-9 ]/\\&/g')
GTM_BODY=$(echo "$GTM_BODY" | sed 's/[^a-zA-Z0-9 ]/\\&/g')
function injectGTM() {
    if [ -z "$1" ]; then
        echo "injectGTM Parameter #1 is zero length. Skipping."
    fi
    echo "injectGTM $1"
    perl -pi -e 's;\<head(?!er).*>$;$_\t'"$GTM_HEAD"';i' $1
    perl -pi -e 's;\<body.*>$;$_\t'"$GTM_BODY"';i' $1
}
#=== End Google Tag Manager ===#

# Copy files to temp deployment directory
mkdir -p $DEPLOY_DIR
echo "COPYING FILES TO '${DEPLOY_DIR}'"
rsync -a . $DEPLOY_DIR --exclude '.*' --exclude 'deploy*.sh'

# Handle objects which will be set up as redirects
echo "SYNCING REDIRECT FILES TO BUCKET '${BUCKET}' REGION '${REGION}'"
for filename in $(find $DEPLOY_DIR -type f -iname '*.redirect'); do
  original="$filename"
  clean="${filename%.*}"
  # Move it
  mv $original $clean
  aws s3 sync $DEPLOY_DIR s3://$BUCKET --include '$clean' --exclude '*.*' --no-guess-mime-type --content-type 'text/html' --website-redirect $(cat $clean) --size-only --region $REGION
done

# Remove the .html extension from all html files and inject GTM
for filename in $(find $DEPLOY_DIR -type f -iname '*.html'); do
    injectGTM $filename
    if [ $filename != "$DEPLOY_DIR/index.html" ] && [ $filename != "$DEPLOY_DIR/404.html" ];
    then
        original="$filename"
	clean="${filename%.*}"
        # Move it
        mv $original $clean 
    fi
done

# Upload the clean html files to s3
echo "SYNCING FILES WITHOUT AN EXTENSION TO BUCKET '${BUCKET}' REGION '${REGION}'"
aws s3 sync $DEPLOY_DIR s3://$BUCKET --include '*[!.*]' --exclude '*.*' --no-guess-mime-type --content-type 'text/html' --size-only --region $REGION

# Sync all remaining files which have an extension
echo "SYNCING FILES WITH AN EXTENSION TO BUCKET '${BUCKET}' REGION '${REGION}'"
aws s3 sync --delete $DEPLOY_DIR s3://$BUCKET --include '*.*' --size-only --region $REGION

# Cleanup
echo "REMOVING TEMP DEPLOYMENT DIR '${DEPLOY_DIR}'"
rm -r $DEPLOY_DIR
