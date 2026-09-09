---
id: boyd-richerson-2009-voting-with-feet
title: The Boyd & Richerson (2009) Voting With Your Feet Replication
sidebar_position: 4
slug: /evolved-cooperation/boyd-richerson-2009-voting-with-feet
---

import GithubLink from '@site/src/components/GithubLink';

# The Boyd & Richerson (2009) Voting With Your Feet Replication

<GithubLink href="https://github.com/doesburg11/BoydRicherson2009" />

## 1. The question the paper asks

<div style={{ backgroundColor: '#EAF2FB', border: '1px solid #D6E4F5', padding: '0.4rem 1.25rem', margin: '0 0 1.5rem 0', color: '#1F2D3D' }}>The companion paper to <a href="/evolved-cooperation/boyd-richerson-2009-culture">Culture and the Evolution of Human Cooperation</a> — same authors, same year, distinct model. Boyd & Richerson (2009), "Voting With Your Feet: Payoff Biased Migration and the Evolution of Group Beneficial Behavior" (<em>J. Theor. Biol.</em>), ask what happens when migration is <strong>nonrandom</strong>: people tend to move from societies they perceive as worse to ones they perceive as better, and — if migrants assimilate to their new society's norms rather than converting it to their own — does that payoff-biased migration reliably spread whichever behavior is actually group-beneficial?</div>

## 2. The mechanism

Two subpopulations, each with a behavior frequency that shifts under local conformist pressure (`d`, `h`, `g` payoff parameters set the local incentive structure) and under migration, where the migration rate itself is biased by perceived relative payoff (`mu` controls how strongly migrants favor the better-off society, `m0` sets the baseline migration rate). Whether cultural diversity between the two societies survives, or one behavior sweeps the whole population, is governed by a single ratio: `m0 / beta` (baseline migration rate versus local conformist strength).

## 3. This site's replication

A from-scratch, independently reviewed reproduction of the paper's model, using its own Fig. 6 parameters, is available in the [BoydRicherson2009](https://github.com/doesburg11/BoydRicherson2009) repository's `voting_with_feet/` module.

## 4. Result: reproduces the paper's qualitative claim, plus a caveat the paper's own conclusion glosses over

<div style={{ backgroundColor: '#EAF2FB', border: '1px solid #D6E4F5', padding: '0.4rem 1.25rem', margin: '0 0 1.5rem 0', color: '#1F2D3D' }}><strong>Key message:</strong> if groups retain their own culture well, the attractive institution always gains ground — but never drives the alternative to extinction. If migration dominates, a large, less attractive society can instead swamp a smaller, more attractive one: initial size, not merit, decides the outcome.</div>

Below the `m0/beta` threshold, the model reproduces the paper's central claim: the group-beneficial behavior spreads into the other society, monotonically, right up to a sharp threshold — there's no "too little migration" penalty to balance against "too much," just a cliff where the system snaps straight from partial spread to full homogenization. Above that threshold, the outcome instead depends almost entirely on which society started bigger, regardless of which behavior was actually better.

Checking the model's own payoff structure directly — not just which behavior label is more common — surfaces something the paper's own stated conclusion doesn't emphasize: population-wide **welfare** does not rise the same way frequency does. Migration pulls a growing minority of the other society into carrying the "better" behavior, but as long as they remain a minority there, they get the worse minority-carrier payoff — so more migration spreads the *label* further without raising average welfare, right up until the threshold is crossed and the population jumps straight to whichever full-homogenization outcome (better or worse) its starting sizes happened to favor. The paper's own caution against a naive "more migration = more improvement" story turns out to be even sharper once welfare, not just behavior frequency, is checked directly.

## References

- Boyd, R., & Richerson, P. J. (2009). "Voting With Your Feet: Payoff Biased Migration and the Evolution of Group Beneficial Behavior." *Journal of Theoretical Biology*, 257(2), 331–339. https://doi.org/10.1016/j.jtbi.2008.12.007
