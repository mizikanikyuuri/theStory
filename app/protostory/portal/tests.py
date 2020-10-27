# portal/tests.py
from channels.testing import ChannelsLiveServerTestCase
from selenium import webdriver
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.common.by import By

class MatchMakeTests(ChannelsLiveServerTestCase):
    serve_static = True  # emulate StaticLiveServerTestCase
    PORTAL_URL="portal"
    GAME_URL="gamemain"

    @classmethod
    def setUpClass(cls):
        super().setUpClass()
        try:
            options = webdriver.chrome.options.Options()
            options.add_argument('--headless')
            cls.driver = webdriver.Chrome( "/usr/local/bin/chromedriver",options=options)
        except:
            super().tearDownClass()
            raise

    @classmethod
    def tearDownClass(cls):
        cls.driver.quit()
        super().tearDownClass()
    def test_match_two_player_in_standard_case(self):
        try:
            self._enter_portal()
            self._join_queue()
            self._check_label_represent_in_queue()

            self._open_new_window()
            self._enter_portal()
            self._join_queue()
            self._check_label_represent_in_queue()
            
            
            WebDriverWait(self.driver, 2).until(lambda _:
                self.GAME_URL in self.driver.current_url)

            self._switch_to_window(1)

            WebDriverWait(self.driver, 2).until(lambda _:
                self.GAME_URL in self.driver.current_url)
        finally:
            self._close_all_new_windows()

    # def test_when_chat_message_posted_then_not_seen_by_anyone_in_different_room(self):
    #     try:
    #         self._enter_chat_room('room_1')

    #         self._open_new_window()
    #         self._enter_chat_room('room_2')

    #         self._switch_to_window(0)
    #         self._post_message('hello')
    #         WebDriverWait(self.driver, 2).until(lambda _:
    #             'hello' in self._chat_log_value,
    #             'Message was not received by window 1 from window 1')

    #         self._switch_to_window(1)
    #         self._post_message('world')
    #         WebDriverWait(self.driver, 2).until(lambda _:
    #             'world' in self._chat_log_value,
    #             'Message was not received by window 2 from window 2')
    #         self.assertTrue('hello' not in self._chat_log_value,
    #             'Message was improperly received by window 2 from window 1')
    #     finally:
    #         self._close_all_new_windows()

    # === Utility ===
    def _join_queue(self):
        ActionChains(self.driver).find_elements_by_css_selector("#start-sticker #the-story-sticker-click-able").perform()
        
    def _enter_portal(self):
        self.driver.get(self.live_server_url + '/portal/')
        WebDriverWait(self.driver, 2).until(lambda _:
            self.PORTAL_URL in self.driver.current_url)

    def _check_label_represent_in_queue(self):
        self.assertIs(self.driver.find_elements_by_css_selector("#start-sticker h1").text == "IN QUEUE", True)

    def _open_new_window(self):
        self.driver.execute_script('window.open("about:blank", "_blank");')
        self.driver.switch_to_window(self.driver.window_handles[-1])

    def _close_all_new_windows(self):
        while len(self.driver.window_handles) > 1:
            self.driver.switch_to_window(self.driver.window_handles[-1])
            self.driver.execute_script('window.close();')
        if len(self.driver.window_handles) == 1:
            self.driver.switch_to_window(self.driver.window_handles[0])

    def _switch_to_window(self, window_index):
        self.driver.switch_to_window(self.driver.window_handles[window_index])

    def _post_message(self, message):
        ActionChains(self.driver).send_keys(message + '\n').perform()

    # @property
    # def _chat_log_value(self):
    #     return self.driver.find_element_by_css_selector('#chat-log').get_property('value')