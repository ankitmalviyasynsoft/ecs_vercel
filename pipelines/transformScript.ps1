# # Write-Host "PUBLIC_URL: $env:PUBLIC_URL"

# $envFilePath = "./.env"
# $templateContent = Get-Content $envFilePath

# # Define a hashtable containing key-value pairs for replacement
# $replacements = @{
#     '{{DOMAIN}}' = "$env:DOMAIN"
#     '{{DOWNLOAD_PATH}}' = "$env:DOWNLOAD_PATH"
#     '{{GA_KEY}}' = "$env:GA_KEY"
#     '{{GTM_KEY}}' = "$env:GTM_KEY"
#     '{{ICS_Path}}' = "$env:ICS_Path"
#     '{{IS_JSON_DATA}}' = "$env:IS_JSON_DATA"
#     '{{NEXT_PUBLIC_BASE_URL}}' = "$env:NEXT_PUBLIC_BASE_URL"
#     '{{NEXT_PUBLIC_HOISTED_URL}}' = "$env:NEXT_PUBLIC_HOISTED_URL"
# }

# # Replace placeholders with actual values
# foreach ($key in $replacements.Keys) {
#     $templateContent = $templateContent -replace $key, $replacements[$key]
# }

# # Write the modified content back to the .env file
# $templateContent | Set-Content $envFilePath


$envFilePath = "./.env"
$templateContent = Get-Content $envFilePath

$replacements = @{
    '{{NEXT_PUBLIC_BASE_URL}}' = "$env:NEXT_PUBLIC_BASE_URL"
    '{{NEXT_PUBLIC_API_BASE_URL}}' = "$env:NEXT_PUBLIC_API_BASE_URL"
    '{{NEXT_PUBLIC_DOMAIN}}' = "$env:NEXT_PUBLIC_DOMAIN"
    '{{NEXT_PUBLIC_DOWNLOAD_PATH}}' = "$env:NEXT_PUBLIC_DOWNLOAD_PATH"
    '{{NEXT_PUBLIC_MEDIA_BASE_URL}}' = "$env:NEXT_PUBLIC_MEDIA_BASE_URL"
    '{{NEXT_PUBLIC_GA_KEY}}' = "$env:NEXT_PUBLIC_GA_KEY"
    '{{NEXT_PUBLIC_GTM_KEY}}' = "$env:NEXT_PUBLIC_GTM_KEY"
    '{{NEXT_PUBLIC_RECAPTHA_KEY}}' = "$env:NEXT_PUBLIC_RECAPTHA_KEY"
    '{{NEXT_PUBLIC_API_SUBSCRIPTION_KEY}}'="$env:NEXT_PUBLIC_API_SUBSCRIPTION_KEY"
    '{{MEDIA_BASE_URL}}' = "$env:MEDIA_BASE_URL"
}

foreach ($key in $replacements.Keys) {
    $templateContent = $templateContent -replace $key, $replacements[$key]
}

$templateContent | Set-Content $envFilePath
