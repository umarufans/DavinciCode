#encoding:utf-8
import tornado.ioloop
import tornado.web
import tornado.websocket
import tornado.httpserver
import json
import sys
import os
import random
from multiprocessing import Pool

rest_card = range(26)
users={} #users={'username':self,...,}
players=[] # players=[[User,status],...]
current_card={}  # cu = {'username':[[pai]]}
user_list=[] #[user1,user2]
class Join(tornado.websocket.WebSocketHandler):
	def check_origin(self, origin):
		return True
#偶数表示黑色0,2,4,6,8,10,12,14,16,18,20,22, 24表示黑杠,
#奇数表示白色1,3,5,7,9,11,13,15,17,19,21,23, 25表示白杠,
#传牌 每张牌 颜色color(0,1），数值number（0-26），是否翻开status：boolean

#对象：
#用户表users:{'username':self}
#玩家表players:[[User,status],...]
#单张牌：[number,status]--status表示牌能否被其他玩家看见
#牌组current_card：{'username':[pai],'username':[pai]]

#初始化：msg=0；告诉客户端哪种颜色可取msg=2，#告诉客户端谁先手msg=1;
	def open(self,username):
		def begin():
			print 'games begin!'
			for x in users:
				players.append([User(x),False])  # players=[[user,status],...]
			for player in players:
				if player[0].card==[]:
					current_card[player[0].username] = player[0].first_passcard()
			print '开始发牌'
			for user in users:
				current_card['msg']=0
				users[user].write_message(json.dumps(current_card)) # cu = {'username':[[pai]]}
				current_card.pop('msg')
			print current_card
			index = random.randint(0,len(players)-1)
			players[index][-1]=True
			print 'players',index,'is beginner'
			i = {'msg':1}
			i['name']=players[index][0].username
			for user in users:
				users[user].write_message(json.dumps(i)) #告诉客户端谁先手

		print username
		users[username]=self
		print 'a user come in!'
		if len(users)==3: #凑够几人则开始游戏
			
			for name in users: #返回给客户端所有玩家的name，来让客户端显示其他玩家的牌
				user_list.append(name)
			print 'user_list =',user_list
			for user in users:
				users[user].write_message(json.dumps(user_list))
			begin()

# players=[[User,status],...]
# cu = {'username':[[pai]]}
#users={'username':self,...,}
#user_list=[user1,user2]
#
	def on_message(self,message):
		msg = json.loads(message)
		print 'msg = ',msg
		username = msg[0] #任何情况先发用户名,然后接操作码 即 用户名msg[0]，操作码msg[1]

#-------------------抓牌----------------------------
		#抓牌 [user,1,color] #color 用数字表示 黑0,白1
		def get_card(color):
			while True:
				x = len(rest_card)
				index = random.randint(0,x)
				c = rest_card[index]
				if c%2==color:
					temp_card=[c,0]
					return temp_card

		#用户选择抓牌
		#用户选择颜色--服务器判断是否有白色和黑色可选
		if msg[1]==1:
			odd=False
			even=False
			for rest in rest_card:
				if rest%2==1:
					odd=True
				if rest%2==0:
					even = False
				if odd and even:
					break
		#	self.write_message(json.dumps({'msg':2,'odd':odd,'even':even}))
		#	if (odd and msg[2]==1) or (even and msg[2]==0):
			for player in players:
				if player[1] and username==player[0].username:
					temp_card = get_card(msg[2])
			#		player.card.append(temp_card)
					i ={'msg':3,'info':temp_card}
					print i
					for user in users:
						users[user].write_message(json.dumps(i)) #将这张牌返回给客户端
					break
		#	else:
		#		self.write_message(json.dumps('error'))#理论上不会发生这种情况的

#-------------------猜牌----------------------------
		#猜牌 [user,2,[user1,user2,index,value]]
		# user1猜user2的第index张牌是value；
		def judgeCard(user2,index,value):
			for player in players:
				if player.username==user2:
					result = (player.card[index]==value)
					return result

		if msg[1]==2:
			info = msg[2]
			Result={}
			#检查user2的第index张牌的值是不是value
			result = judgeCard(info[1],info[2],info[3])
			info[3]=result
		#返回value = [user1,user2,index,result] 向所有人发
		#Result = {'username':value}
			for user in user_list:
				Result[user]=info #得到数据--所有人一样
			for user in users:  #向所有人发
				users[user].write_message(json.dumps(Result))

#-------------------结束操作----------------------------
		#结束操作:[user,3,nextusername]
		#结束操作，当前玩家的状态变成False, 写一个玩家的状态变成True
		if msg[1]==3:
			for player in players:
				if player[1] and username==player[0].username:
					player[1]=False
			for player in players:
				if msg[2]==player[0].username:
					player[1]=True


class User:
	def __init__(self,username):
		self.username = username
		self.rest_card = rest_card
		self.card=[]
	def first_passcard(self,n=3):#发3张牌，放到self.card里
		gang = False #目前没有杠
		for x in range(n):
			length = len(rest_card)
			while len(self.card)==x:
				index = random.randint(0,length-1)
				c = self.rest_card[index]
				if c==24 or c==25:
					if not gang:
						gang=True
					else:
						continue
				self.card.append([c,0])
				self.rest_card.remove(c)
		self.card = self.my_sort(self.card) #进行排序，然后返回
		return self.card
	def my_sort(self,my_card):
		def comp(a,b):
			if a[0]<b[0]:
				return -1
			else:
				return 1
		if [24,0] in my_card or [24,1] in my_card or [25,0] in my_card or [25,1] in my_card:
			my_card.sort(comp)
		#	print my_card
			temp = my_card[-1]
			my_card.pop()
			my_card.insert(1,temp)
		else:
			my_card.sort(comp)
	#	print 'last:',my_card
		return my_card

application = tornado.web.Application([
    (r"/(.*)", Join),
])
if __name__ == "__main__":
    http_server = tornado.httpserver.HTTPServer(application)
    http_server.listen(8888)
    tornado.ioloop.IOLoop.instance().start()



