import { authWithHeaders } from '../../middlewares/auth';

const api = {};

// @TODO export this const, cannot export it from here because only routes are exported from
// controllers
const LAST_ANNOUNCEMENT_TITLE = 'JUNE SUBSCRIBER ITEMS, RESOLUTION SUCCESS CHALLENGE, AND TAKE THIS CHALLENGE';
const worldDmg = { // @TODO
  bailey: false,
};

/**
 * @api {get} /api/v3/news Get latest Bailey announcement
 * @apiName GetNews
 * @apiGroup News
 *
 *
 * @apiSuccess {Object} html Latest Bailey html
 *
 */
api.getNews = {
  method: 'GET',
  url: '/news',
  async handler (req, res) {
    const baileyClass = worldDmg.bailey ? 'npc_bailey_broken' : 'npc_bailey';

    res.status(200).send({
      html: `
      <div class="bailey">
        <div class="media align-items-center">
          <div class="mr-3 ${baileyClass}"></div>
          <div class="media-body">
            <h1 class="align-self-center">${res.t('newStuff')}</h1>
            <h2>6/1/2020 - ${LAST_ANNOUNCEMENT_TITLE}</h2>
          </div>
        </div>
        <hr/>
        <div class="promo_mystery_202006 center-block"></div>
        <h3>June Subscriber Items Revealed!</h3>
        <p>
          The June Subscriber Item Set is here: the Multichrome Merfolk Item Set! <a
          href='/user/settings/subscription'>Subscribe to Habitica</a> by June 30 to receive this
          exciting set! If you're already an active subscriber, reload the site and then head to
          Inventory > Items to claim your gear!
        </p>
        <p>
          Subscribers also receive the ability to buy Gems with Gold -- the longer you subscribe,
          the more Gems you can buy per month! There are other perks as well, such as longer access
          to uncompressed data and a cute Jackalope pet. Best of all, subscriptions let us keep
          Habitica running. Thank you very much for your support -- it means a lot to us.
        </p>
        <div class="small mb-3">by Beffymaroo</div>
        <div class="scene_hiking center-block"></div>
        <h3>June 2020 Resolution Success Challenge and Take This Challenge</h3>
        <p>
          The Habitica team has launched a special official Challenge series hosted in the <a
          href='/groups/guild/6e6a8bd3-9f5f-4351-9188-9f11fcd80a99' target='_blank'>Official New
          Year's Resolution Guild</a>. These Challenges are designed to help you build and maintain
          goals that are destined for success and then stick with them as the year progresses. For
          this month's Challenge, <a href='/challenges/c69a9194-b4a4-43aa-bf3e-9b3bea476755'>Mark
          Your Journey</a>, we're reflecting on your achievements since January and looking ahead
          to the rest of the year! It has a 15 Gem prize, which will be awarded to five lucky
          winners on July 1st.
        </p>
        <p>
          Congratulations to the winners of May's Challenge, @kelps, @JHylander, @theFishhimself,
          @akverbatim, and @SunshineDay29!
        </p>
        <p>
          The next Take This Challenge has also launched, "<a
          href='/challenges/9553b11a-2933-4ec6-83f9-84a412dd7896'>Keep Calm and Carry On!</a>",
          with a focus on practicing breathing techniques to relieve intense emotions. Be sure to
          check it out to earn additional pieces of the Take This armor set!
        </p>
        <div class="promo_take_this center-block"></div>
        <p>
          <a href='http://www.takethis.org/' target='_blank'>Take This</a> is a nonprofit that
          seeks to inform the gamer community about mental health issues, to provide education
          about mental disorders and mental illness prevention, and to reduce the stigma of mental
          illness.
        </p>
        <p>
          Congratulations to the winners of the last Take This Challenge, "Don't Be a
          Completionist!": grand prize winner @Felicius, and runners-up @zhanghaoran, Zashi,
          @marie56, @KelaLilBear, and @LiamTown! Plus, all participants in that Challenge have
          received a piece of the <a
          href='http://habitica.wikia.com/wiki/Event_Item_Sequences#Take_This_Armor_Set'
          target='_blank'>Take This item set</a> if they hadn't completed it already. It is located
          in your Rewards column. Enjoy!
        </p>
        <div class="small mb-3">
          by Doctor B, the Take This team, Lemoness, Beffymaroo, and SabreCat
        </div>
      </div>
      `,
    });
  },
};

/**
 * @api {post} /api/v3/news/tell-me-later Allow latest Bailey announcement to be read later
 * @apiName TellMeLaterNews
 * @apiDescription Add a notification to allow viewing of the latest "New Stuff by Bailey" message.
 * Prevent this specific Bailey message from appearing automatically.
 * @apiGroup News
 *
 *
 * @apiSuccess {Object} data An empty Object
 *
 */
api.tellMeLaterNews = {
  method: 'POST',
  middlewares: [authWithHeaders()],
  url: '/news/tell-me-later',
  async handler (req, res) {
    const { user } = res.locals;

    user.flags.newStuff = false;

    const existingNotificationIndex = user.notifications.findIndex(n => n && n.type === 'NEW_STUFF');
    if (existingNotificationIndex !== -1) user.notifications.splice(existingNotificationIndex, 1);
    user.addNotification('NEW_STUFF', { title: LAST_ANNOUNCEMENT_TITLE }, true); // seen by default

    await user.save();
    res.respond(200, {});
  },
};

export default api;
