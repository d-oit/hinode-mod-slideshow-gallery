# Hinode Module - Slideshow Gallery

<!-- Tagline -->
<p align="center">
    <b>A slideshow gallery shortcode for Hugo compatible with Hinode</b>
    <br />
</p>

<!-- Badges -->
<p align="center">
    <a href="https://gohugo.io" alt="Hugo website">
        <img src="https://img.shields.io/badge/generator-hugo-brightgreen">
    </a>
    <a href="https://gethinode.com" alt="Hinode theme">
        <img src="https://img.shields.io/badge/theme-hinode-blue">
    </a>
    <a href="https://github.com/d-oit/hinode-mod-slideshow-gallery/commits/main" alt="Last commit">
        <img src="https://img.shields.io/github/last-commit/d-oit/hinode-mod-slideshow-gallery.svg">
    </a>
    <a href="https://github.com/d-oit/hinode-mod-slideshow-gallery/pulls" alt="Pulls">
        <img src="https://img.shields.io/github/issues-pr-raw/d-oit/hinode-mod-slideshow-gallery.svg">
    </a>
    <a href="https://github.com/d-oit/hinode-mod-slideshow-gallery/blob/main/LICENSE" alt="License">
        <img src="https://img.shields.io/github/license/d-oit/hinode-mod-slideshow-gallery">
    </a>
</p>

## About

![Logo](https://raw.githubusercontent.com/gethinode/hinode/main/static/img/logo.png)

Hinode is a clean blog theme for [Hugo][hugo], an open-source static site generator. Hinode is available as a [template][repository_template], and a [main theme][repository]. <!-- This repository maintains a Hugo module to add [module][module] to a Hinode site. --> Visit the Hinode documentation site for [installation instructions][hinode_docs].

## Contributing

This module uses [semantic-release][semantic-release] to automate the release of new versions. The package uses `husky` and `commitlint` to ensure commit messages adhere to the [Conventional Commits][conventionalcommits] specification. You can run `npx git-cz` from the terminal to help prepare the commit message.

## Configuration

This module supports the following parameters (see the section `params.modules` in `config.toml`):

```toml

[modules]
    [modules.mod-slideshow-gallery]
        integration = "optional"
        state = "async"
        localize = true
```

## Load the module in the markdown file in front matter

```yaml
modules: ["slideshow-gallery"]
```

## slideshow-gallery markdown shortcode

```markdown
{{< slideshow-gallery >}}
```

## slideshow-gallery Shortcode Parameters

The `slideshow-gallery` shortcode supports the following parameters:

* `ratio`: Specifies the aspect ratio of the images. Default is "auto".
* `loading`: Specifies the loading behavior of the images. Default is "lazy".

These parameters can be used to customize the behavior and appearance of the slideshow gallery. For more details, refer to the `layouts/shortcodes/slideshow-gallery.html` file.

## Examples

Here are some examples of using the `slideshow-gallery` shortcode with different parameters:

* **Default usage**:
  ```markdown
  {{< slideshow-gallery >}}
  ```

* **Specifying aspect ratio**:
  ```markdown
  {{< slideshow-gallery ratio="16x9" >}}
  ```

* **Specifying loading behavior**:
  ```markdown
  {{< slideshow-gallery loading="eager" >}}
  ```

* **Combining parameters**:
  ```markdown
  {{< slideshow-gallery ratio="4x3" loading="lazy" >}}
  ```

These examples demonstrate how to use the `slideshow-gallery` shortcode with different parameters to customize the behavior and appearance of the slideshow gallery. For more details, refer to the `layouts/shortcodes/slideshow-gallery.html` file.

## dist/slideshow-gallery.js

The `dist/slideshow-gallery.js` file provides the JavaScript functionality required for the slideshow gallery module. This file is essential for the interactive features of the slideshow gallery, such as navigation buttons, fullscreen mode, and image transitions. It ensures that the slideshow gallery operates smoothly and provides a seamless user experience.

## dist/slideshow-gallery.scss

The `dist/slideshow-gallery.scss` file contains the SCSS styles for the slideshow gallery module. This file is included in the `assets/scss` directory and provides the necessary styles for the slideshow gallery's appearance.

## config.toml

The `dist` files are referenced in the `config.toml` file. The JavaScript file is mounted to `assets/js/modules/slideshow-gallery/slideshow-gallery.js`, and the SCSS file is included in the `assets/scss` directory.

<!-- MARKDOWN LINKS -->
[hugo]: https://gohugo.io
[hinode_docs]: https://gethinode.com
<!-- [module]: https://example.com -->
[repository]: https://github.com/gethinode/hinode.git
[repository_template]: https://github.com/gethinode/template.git
[conventionalcommits]: https://www.conventionalcommits.org
[husky]: https://typicode.github.io/husky/
[semantic-release]: https://semantic-release.gitbook.io/
