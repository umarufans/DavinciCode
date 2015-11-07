#encoding:utf-8

import tornado.ioloop
import tornado.web
import tornado.websocket
import tornado.httpserver
import json
import os, time, random
from multiprocessing import Queue

users = []


class HelloWorldHandler(tornado.websocket.WebSocketHandler):
	def check_origin(self, origin):
		return True

	def open(self,params):
		users.append(self)
		print users
		if len(users)==2:
			users[0].write_message('hello,user1')
			users[1].write_message('hello,user2')
#		print 'websocket open and the params is %s'%params
#		pid = os.fork()#
#		if pid==0:#如果是子进程，做如下事情
#			self.write_message(json.dumps(os.getpid())) #建立连接时，给出pid
		
	def on_message(self,message):
#		print message
		q = Queue()
		def write(q):
			for value in ['A', 'B', 'C']:
				print 'Put %s to queue...' % value
				q.put(value)
				time.sleep(random.random())
		def read(q):
			while True:
				value = q.get(True)
				print 'Get %s from queue.' % value
		
#		pw = Process(target=write, args=(q,))
#    	pr = Process(target=read, args=(q,))

		self.write_message('hello,%s' %message)
		
	def on_close(self):
		print "WebSocket closed"

application = tornado.web.Application([
    (r"/(.*)", HelloWorldHandler),
])

if __name__ == "__main__":
   	http_server = tornado.httpserver.HTTPServer(application)
 	http_server.listen(8888)
   	tornado.ioloop.IOLoop.instance().start()


