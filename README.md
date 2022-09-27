# Aké's Wensjes

This repository contains the source code of the baby wishlist for my son Aké.

It's built using [Remix's Blues Stack starter](README-blues-stack.md), so for more information about that please read that Readme.

## Image pipeline
This website contains a pretty simple but surprisingly robust image pipeline system using Sharp. When an item is added,
the image URL is being picked, the image is being downloaded, and the image is then being regenerated in multiple sizes. These are then being
fetched by the browser based on restraints like screen dimensions.

**IMPORTANT**: Because of the amount of memory and I/O used when regenerating one or more images, an app on Fly should have at least 512MB of memory.
