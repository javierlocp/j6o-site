---
title: The UX of Decimals
slug: ux-of-decimals
date: 2025-09-05
excerpt: A scalable approach to numerical clarity in finance and crypto
image: /assets/posts/ux-of-decimals/cover.png
tags: ["design", "process", "fragments", "finance", "crypto"]
---

## Intro

In finance, decimals are essential for accurately representing currency and its value. To earn users’ trust, the way they are displayed is just as important as the overall look and feel of your interfaces.

While it is straightforward to represent fiat values with 2 decimal places (e.g., $0.02), the same cannot be said for crypto.

In fact, most crypto assets trade in micro-values, and the ERC-20 token standard, for example, employs up to 18 decimal places by default.

## The Most Common Problems

Most front-end engineers and designers (myself included) often opt for the simplest solution: truncating decimals dynamically with `js` or `css`. You’ve probably seen solutions like these online:

![Example UI A vs B](/assets/posts/ux-of-decimals/ui-problems.png "Examples UI Comparison")

**Option B introduces a problem:** while the ellipses (...) and the fiat value ($0.02) suggest there’s more to the user’s balance, the display can still mislead users.

The issue becomes more serious when no fiat equivalent is available. Without the supporting context of a dollar value, the truncated display leaves users uncertain whether they hold any balance at all.

![Example UI C](/assets/posts/ux-of-decimals/ui-problems-c.png "Examples UI C, Worse Case")

When displaying crypto balances, the goal is to balance accuracy, readability, and trust. Here are two design rules to guide decimal display:

1. Minimum Significant Decimals Rule
2. Value-scaled Precision Rule

## 1. Minimum Significant Decimals Rule

Minimum Significant Decimals refers to the smallest number of decimal places that still carries meaningful information for users. Defining and enforcing this rule helps cover most edge cases. If you don't know which minimum decimals to choose, you can fall back on the native token’s decimals and test different values.

![Minimum Significant Decimals](/assets/posts/ux-of-decimals/min-sig-dec-rule.png "Minimum Significant Decimals Example")

### Always display a minimum number of decimals

Example: **1.150000 ETH** instead of **1.15 ETH**, this avoids the impression of rounding uncertainty.

### Set a maximum number of decimals

Example: **0.00000427 ETH** and **0.000004271063139123 ETH** both equal $0.02, so the extra precision adds no value.

Anything beyond 8 decimals is rarely useful, especially when the fiat equivalent rounds to cents.

### Avoid truncating with ellipsis

Example: Display < 0.000001 instead of truncating to 0.00000…

## 2. Value-scaled Precision Rule

While the Minimum Significant Decimals Rule ensures clarity by avoiding under/over-rounding, the Value-Scaled Precision Rule helps adjust the number of decimals shown based on the size of the value.

The idea is simple: as values increase, fewer decimals are needed to remain meaningful. Your UI should scale precision according to the value, ensuring users always see enough detail without being overwhelmed by noise.

![Value-scaled](/assets/posts/ux-of-decimals/value-scaled-rule.png "Value-scaled Example")

The example above follows these rules (adjust them as needed):

- Start with a base precision of 8 decimals
- For each power of 10 increase in the integer value, reduce the decimal precision by 1
- Set a minimum floor of 2 decimals (optional but recommended)

## When not to apply these rules

While you can apply these rules to most of your UI, I wouldn’t recommend applying them to input fields. For example, in the Stake screen below. When a user interacts with the **MAX function**, it is recommended to display the token’s full default decimals.

![Stake UI](/assets/posts/ux-of-decimals/stake-ui.png "Stake UI Example")

In this case, maximum accuracy matters more than readability.

## Closing Thoughts

Decimals may look like a small detail and are often overlooked in UI design, but how we present them has a big impact on user trust. We can show numbers in a way that _**feels**_ both accurate and trustworthy by carefully designing its logic.

Especially in crypto where the difference between 0.000004 & 0.00000427 can matter, this balance becomes even more important. Getting it right doesn't just make the interface cleaner but it can also make the entire UX feel more reliable.

And while this article focuses on finance & crypto, the same principles hold true whenever precision and readability are needed. From everyday tools to products that deal with numbers at scale.

If you have any ideas on how to further improve this, or just want to chat, feel free to reach out at [**hello@javierlo.com**](mailto:hello@javierlo.com).

Thank you for reading. 🙏🏻

Special thanks to [Fendy Ibrahim](https://www.linkedin.com/in/iamfnd/) for proofreading.

\* Note: All UI examples are handcrafted by Javier Lo.
